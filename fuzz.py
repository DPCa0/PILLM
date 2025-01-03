import os
import subprocess
import mmap
import posix_ipc
import tempfile
import time
import hashlib
import json
import signal
import csv
import numpy as np
import matplotlib.pyplot as plt

COVERAGE_MAP_SIZE = 1 << 20
SHM_SIZE = COVERAGE_MAP_SIZE

COVERAGE_BITMAP_FILENAME = 'coverage_bitmap.dat'
COVERAGE_LOG_FILENAME = 'coverage_log.csv'
COVERAGE_HEATMAP_FILENAME = 'coverage_heatmap.png'

global_coverage = bytearray(COVERAGE_MAP_SIZE)
total_possible_edges = None
iteration_count = 0

metrics = {
    'total_executions': 0,
    'total_execution_time': 0.0,
    'total_crashes': 0,
    'total_timeouts': 0,
    'unique_bug_types': set(),
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
            'timestamp',
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
            'unique_bugs'
        ]
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        if write_header:
            writer.writeheader()
        writer.writerow(log_data)

def save_coverage_heatmap(output_folder):
    global global_coverage
    coverage_array = np.frombuffer(global_coverage, dtype=np.uint8)
    # For a 1 MB buffer, 1024 x 1024 is a convenient 2D layout
    coverage_matrix = coverage_array.reshape((1024, 1024))
    plt.figure(figsize=(10, 10))
    plt.imshow(coverage_matrix, cmap='hot', interpolation='nearest')
    plt.title('Coverage Heatmap')
    plt.colorbar()
    heatmap_path = os.path.join(output_folder, COVERAGE_HEATMAP_FILENAME)
    plt.savefig(heatmap_path)
    plt.close()
    print(f"Saved coverage heatmap to {heatmap_path}")

def run_test(javascript_code, output_folder, jsc_path, iteration, pillm_run=False):

    global global_coverage
    global total_possible_edges
    global metrics

    shm_name = "/FuzzilliSHM"
    try:
        posix_ipc.unlink_shared_memory(shm_name)
    except posix_ipc.ExistentialError:
        pass

    if not pillm_run:
        shm = posix_ipc.SharedMemory(shm_name, flags=posix_ipc.O_CREX, mode=0o600, size=SHM_SIZE)
        mapfile = mmap.mmap(shm.fd, SHM_SIZE, prot=mmap.PROT_READ | mmap.PROT_WRITE)
        shm.close_fd()
        mapfile.seek(0)
        mapfile.write(bytearray(COVERAGE_MAP_SIZE))
        mapfile.flush()
    else:
        shm = None
        mapfile = None

    env = os.environ.copy()
    if not pillm_run:
        env['SHM_ID'] = shm_name

    with tempfile.NamedTemporaryFile(mode='w', delete=False, suffix='.js') as js_file:
        js_file.write(javascript_code)
        js_file_path = js_file.name

    try:
        start_time = time.time()
        process = subprocess.Popen(
            [jsc_path, js_file_path],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            env=env
        )

        try:
            stdout, stderr = process.communicate(timeout=5)
            jsc_status = process.returncode
        except subprocess.TimeoutExpired:
            process.kill()
            stdout, stderr = process.communicate()
            jsc_status = 'timeout'

        end_time = time.time()
        execution_time = end_time - start_time

        metrics['total_executions'] += 1
        metrics['total_execution_time'] += execution_time

        stdout_decoded = stdout.decode(errors='replace')
        stderr_decoded = stderr.decode(errors='replace')

        bug_type = None
        if jsc_status == 'timeout':
            bug_type = 'timeout'
            metrics['total_timeouts'] += 1
        else:
            try:
                jsc_status_int = int(jsc_status)
            except ValueError:
                jsc_status_int = -9999
            if isinstance(jsc_status_int, int) and jsc_status_int < 0:
                signal_num = -jsc_status_int
                bug_type = f'crash_signal_{signal_num}'
                metrics['total_crashes'] += 1
            elif jsc_status_int != 0 and jsc_status_int != -9999:
                bug_type = 'non_zero_exit'

            fatal_error_keywords = ['ASSERTION FAILED', 'Fatal error', 'Segmentation fault',
                                    'Aborted', 'Trace/BPT trap']
            if any(keyword in stderr_decoded for keyword in fatal_error_keywords):
                bug_type = 'fatal_error'
                metrics['total_crashes'] += 1

        if bug_type:
            metrics['unique_bug_types'].add(bug_type)

        if pillm_run:
            record_data = {
                'test_code': javascript_code,
                'execution_time': execution_time,
                'jsc_status': jsc_status,
                'stdout': stdout_decoded,
                'stderr': stderr_decoded,
                'bug_type': bug_type,
                'new_edges': 0,
            }

            timestamp = time.strftime('%Y%m%d_%H%M%S')
            js_hash = hashlib.sha256(javascript_code.encode()).hexdigest()[:8]
            bug_suffix = f"_{bug_type}" if bug_type else ""
            record_filename = f'record_pillm_{timestamp}_{js_hash}{bug_suffix}.txt'
            record_filepath = os.path.join(output_folder, record_filename)
            with open(record_filepath, 'w') as record_file:
                for key, value in record_data.items():
                    record_file.write(f"{key}: {value}\n")

            print(f"Saved pillm-run record to {record_filepath}")
            return record_data
        else:
            if total_possible_edges is None:
                possible_edges = get_total_possible_edges(stdout_decoded)
                if possible_edges is None:
                    possible_edges = COVERAGE_MAP_SIZE * 8
                total_possible_edges = possible_edges
                print(f"Total possible edges set to {total_possible_edges}")

            mapfile.seek(0)
            coverage_data = mapfile.read(COVERAGE_MAP_SIZE)

            new_edges = 0
            for i in range(COVERAGE_MAP_SIZE):
                new_bits = coverage_data[i] & ~global_coverage[i]
                new_edges += bin(new_bits).count('1')

            for i in range(COVERAGE_MAP_SIZE):
                global_coverage[i] |= coverage_data[i]

            cumulative_edges_covered = count_bits(global_coverage)
            cumulative_coverage_percentage = (cumulative_edges_covered / total_possible_edges) * 100
            new_coverage_percentage = (new_edges / total_possible_edges) * 100

            average_execution_time = metrics['total_execution_time'] / metrics['total_executions']

            record_data = {
                'test_code': javascript_code,
                'execution_time': execution_time,
                'jsc_status': jsc_status,
                'cumulative_coverage': f"{cumulative_coverage_percentage:.6f}",
                'new_coverage': f"{new_coverage_percentage:.6f}",
                'cumulative_edges_covered': cumulative_edges_covered,
                'new_edges': new_edges,
                'total_possible_edges': total_possible_edges,
                'stdout': stdout_decoded,
                'stderr': stderr_decoded,
                'bug_type': bug_type
            }

            timestamp = time.strftime('%Y%m%d_%H%M%S')
            js_hash = hashlib.sha256(javascript_code.encode()).hexdigest()[:8]
            bug_suffix = f"_{bug_type}" if bug_type else ""
            record_filename = f'record_{timestamp}_{js_hash}{bug_suffix}.txt'
            record_filepath = os.path.join(output_folder, record_filename)
            with open(record_filepath, 'w') as record_file:
                for key, value in record_data.items():
                    record_file.write(f"{key}: {value}\n")

            print(f"Saved coverage record to {record_filepath}")

            save_coverage_bitmap(output_folder)

            log_data = {
                'iteration': iteration,
                'timestamp': timestamp,
                'cumulative_edges_covered': cumulative_edges_covered,
                'new_edges': new_edges,
                'total_possible_edges': total_possible_edges,
                'cumulative_coverage_percentage': cumulative_coverage_percentage,
                'new_coverage_percentage': new_coverage_percentage,
                'execution_time': execution_time,
                'bug_type': bug_type or '',
                'average_execution_time': average_execution_time,
                'total_crashes': metrics['total_crashes'],
                'total_timeouts': metrics['total_timeouts'],
                'unique_bugs': len(metrics['unique_bug_types'])
            }
            append_coverage_log(output_folder, log_data)

            if iteration % 10 == 0:
                save_coverage_heatmap(output_folder)

            return record_data

    finally:
        if mapfile:
            mapfile.close()
            posix_ipc.unlink_shared_memory(shm_name)
        os.remove(js_file_path)