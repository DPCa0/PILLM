#!/usr/bin/env python3
import os
import subprocess
import mmap
import posix_ipc
import tempfile
import time
import hashlib
import csv
import numpy as np

# Constants for coverage map size
COVERAGE_MAP_SIZE = 1 << 20  # 1 MB, matching Fuzzilli's default coverage map size
SHM_SIZE = COVERAGE_MAP_SIZE  # Shared memory size for the coverage map

COVERAGE_BITMAP_FILENAME = 'coverage_bitmap.dat'
COVERAGE_LOG_FILENAME = 'fuzz4all_coverage_log.csv'  # Updated filename as per your request

# Global variables
global_coverage = bytearray(COVERAGE_MAP_SIZE)
total_possible_edges = None  # Will be set based on actual number of edges

# Metrics tracking
metrics = {
    'total_executions': 0,
    'total_execution_time': 0.0,
    'total_crashes': 0,
    'total_timeouts': 0,
    'unique_bug_types': set(),
    'passed_tests': 0,
}

def load_coverage_bitmap(output_folder):
    global global_coverage
    coverage_bitmap_path = os.path.join(output_folder, COVERAGE_BITMAP_FILENAME)
    if os.path.exists(coverage_bitmap_path):
        with open(coverage_bitmap_path, 'rb') as f:
            data = f.read()
            if len(data) != COVERAGE_MAP_SIZE:
                print(f"Coverage bitmap size mismatch: expected {COVERAGE_MAP_SIZE}, got {len(data)}")
                global_coverage = bytearray(COVERAGE_MAP_SIZE)
            else:
                global_coverage = bytearray(data)
        print(f"Loaded coverage bitmap from {coverage_bitmap_path}")
    else:
        print("No existing coverage bitmap found. Starting fresh.")
        global_coverage = bytearray(COVERAGE_MAP_SIZE)

def save_coverage_bitmap(output_folder):
    global global_coverage
    coverage_bitmap_path = os.path.join(output_folder, COVERAGE_BITMAP_FILENAME)
    with open(coverage_bitmap_path, 'wb') as f:
        f.write(global_coverage)

def count_bits(byte_array):
    return sum(bin(byte).count('1') for byte in byte_array)

def get_total_possible_edges(stdout_decoded):
    # Look for the line containing the number of edges
    for line in stdout_decoded.splitlines():
        if '[COV] edge counters initialized.' in line:
            parts = line.strip().split('with')
            if len(parts) >= 2:
                edges_part = parts[1].strip()
                num_edges = int(edges_part.split()[0])
                return num_edges
    return None

def append_coverage_log(output_folder, log_data):
    coverage_log_path = os.path.join(output_folder, COVERAGE_LOG_FILENAME)
    write_header = not os.path.exists(coverage_log_path)
    with open(coverage_log_path, 'a', newline='') as csvfile:
        fieldnames = [
            'iteration',
            'cumulative_edges_covered',
            'new_edges',
            'total_possible_edges',
            'cumulative_coverage_percentage',
            'new_coverage_percentage',
            'execution_time',
            'bug_type',
            'average_execution_time',
            'total_crashes',
            'total_timeouts',
            'unique_bugs',
            'pass_rate'
        ]
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        if write_header:
            writer.writeheader()
        writer.writerow(log_data)

def run_test(javascript_code, output_folder, jsc_path, iteration):
    global global_coverage
    global total_possible_edges
    global metrics

    # Name of the POSIX shared memory object
    shm_name = "/FuzzilliSHM"  # Fuzzilli uses "/FuzzilliSHM" as the shared memory name

    # Create a POSIX shared memory segment
    try:
        posix_ipc.unlink_shared_memory(shm_name)
    except posix_ipc.ExistentialError:
        pass  # If it doesn't exist, that's fine

    shm = posix_ipc.SharedMemory(shm_name, flags=posix_ipc.O_CREX, mode=0o600, size=SHM_SIZE)

    # Memory-map the shared memory segment
    mapfile = mmap.mmap(shm.fd, SHM_SIZE, prot=mmap.PROT_READ | mmap.PROT_WRITE)

    # Close the file descriptor, as it's no longer needed
    shm.close_fd()

    # Create a copy of the environment variables and set SHM_ID
    env = os.environ.copy()
    env['SHM_ID'] = shm_name  # Fuzzilli uses 'SHM_ID' as the environment variable

    # Initialize the shared memory to zero
    mapfile.seek(0)
    mapfile.write(bytearray(COVERAGE_MAP_SIZE))
    mapfile.flush()

    # Write the JavaScript code to a temporary file
    with tempfile.NamedTemporaryFile(mode='w', delete=False, suffix='.js') as js_file:
        js_file.write(javascript_code)
        js_file_path = js_file.name

    try:
        # Run the instrumented JSC with the JavaScript file
        start_time = time.time()
        process = subprocess.Popen(
            [jsc_path, js_file_path],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            env=env
        )

        # Wait for the process to finish with a timeout
        try:
            stdout, stderr = process.communicate(timeout=5)  # Set timeout in seconds
            jsc_status = process.returncode
        except subprocess.TimeoutExpired:
            # If timeout occurs, kill the process and set status to 'timeout'
            process.kill()
            stdout, stderr = process.communicate()
            jsc_status = 'timeout'

        end_time = time.time()
        execution_time = end_time - start_time

        # Update metrics
        metrics['total_executions'] += 1
        metrics['total_execution_time'] += execution_time

        # Decode outputs
        stdout_decoded = stdout.decode(errors='replace')
        stderr_decoded = stderr.decode(errors='replace')

        # Extract total possible edges
        if total_possible_edges is None:
            total_possible_edges = get_total_possible_edges(stdout_decoded)
            if total_possible_edges is None:
                total_possible_edges = COVERAGE_MAP_SIZE * 8  # Default value
            print(f"Total possible edges set to {total_possible_edges}")

        # Read the coverage data
        mapfile.seek(0)
        coverage_data = mapfile.read(COVERAGE_MAP_SIZE)

        # Compute the number of new edges covered in this test
        new_edges = 0
        for i in range(COVERAGE_MAP_SIZE):
            new_bits = coverage_data[i] & ~global_coverage[i]
            new_edges += bin(new_bits).count('1')

        # Update the global coverage bitmap
        for i in range(COVERAGE_MAP_SIZE):
            global_coverage[i] |= coverage_data[i]

        # Calculate cumulative coverage
        cumulative_edges_covered = count_bits(global_coverage)
        cumulative_coverage_percentage = (cumulative_edges_covered / total_possible_edges) * 100
        new_coverage_percentage = (new_edges / total_possible_edges) * 100

        # Detect potential bugs
        bug_type = None

        # Check for timeout
        if jsc_status == 'timeout':
            bug_type = 'timeout'
            metrics['total_timeouts'] += 1
        else:
            # Convert jsc_status to int if it's not 'timeout'
            jsc_status = int(jsc_status)

            # Check for crashes (process terminated by a signal)
            if jsc_status < 0:
                signal_num = -jsc_status
                bug_type = f'crash_signal_{signal_num}'
                metrics['total_crashes'] += 1
            elif jsc_status != 0:
                # Non-zero exit code without signal
                bug_type = 'non_zero_exit'

            # Check stderr for fatal errors or assertion failures
            fatal_error_keywords = ['ASSERTION FAILED', 'Fatal error', 'Segmentation fault', 'Aborted', 'Trace/BPT trap']
            if any(keyword in stderr_decoded for keyword in fatal_error_keywords):
                bug_type = 'fatal_error'
                metrics['total_crashes'] += 1

        # Update pass count
        if bug_type is None:
            metrics['passed_tests'] += 1

        # Calculate average execution time
        average_execution_time = metrics['total_execution_time'] / metrics['total_executions']

        # Calculate pass rate
        pass_rate = (metrics['passed_tests'] / metrics['total_executions']) * 100

        # Prepare log data
        log_data = {
            'iteration': iteration,
            'cumulative_edges_covered': cumulative_edges_covered,
            'new_edges': new_edges,
            'total_possible_edges': total_possible_edges,
            'cumulative_coverage_percentage': f"{cumulative_coverage_percentage:.6f}",
            'new_coverage_percentage': f"{new_coverage_percentage:.6f}",
            'execution_time': f"{execution_time:.6f}",
            'bug_type': bug_type or '',
            'average_execution_time': f"{average_execution_time:.6f}",
            'total_crashes': metrics['total_crashes'],
            'total_timeouts': metrics['total_timeouts'],
            'unique_bugs': len(metrics['unique_bug_types']),
            'pass_rate': f"{pass_rate:.6f}"
        }
        append_coverage_log(output_folder, log_data)

        # Return the record data
        return log_data

    finally:
        # Unlink the shared memory
        mapfile.close()
        posix_ipc.unlink_shared_memory(shm_name)

        # Remove the temporary JavaScript file
        os.remove(js_file_path)

def main():
    global total_possible_edges  # Ensure global variable is used

    input_folder = "/ndata/cdp/fuzz4all/outputs/processed_js_files"  # Update if different
    output_folder = "./stat_outputs"
    jsc_path = "/ndata/cdp/webkit/FuzzBuild/Debug/bin/jsc"  # Updated JSC path as per your request

    total_files = 12354  # Total number of JavaScript files

    # Ensure output directory exists
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    load_coverage_bitmap(output_folder)

    iteration = 0

    for idx in range(total_files):
        js_file_path = os.path.join(input_folder, f"{idx}.js")
        if not os.path.exists(js_file_path):
            print(f"File {js_file_path} does not exist, skipping.")
            continue
        with open(js_file_path, 'r') as js_file:
            javascript_code = js_file.read()

        # Run test
        record_data = run_test(javascript_code, output_folder, jsc_path, iteration)

        iteration += 1

        # Optionally, print progress
        if iteration % 100 == 0:
            print(f"Processed {iteration} files.")

    # At the end, save final coverage bitmap
    save_coverage_bitmap(output_folder)

    print("Execution completed. All data stored in 'fuzz4all_coverage_log.csv'.")

if __name__ == '__main__':
    main()
