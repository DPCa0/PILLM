import os
import re
import random
import argparse
import shutil

def parse_pillm_dump_file(pillm_dump_path):
    file_func_counts = {}
    dir_func_counts = {}

    if not os.path.exists(pillm_dump_path):
        return file_func_counts, dir_func_counts

    with open(pillm_dump_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    pattern = re.compile(r'(\S+\.cpp)::([^(]+)\(start line: (\d+), end line: (\d+)\)')

    for line in lines:
        match = pattern.search(line)
        if not match:
            continue
        cpp_filename = match.group(1).strip()
        func_name = match.group(2).strip()

        if cpp_filename not in file_func_counts:
            file_func_counts[cpp_filename] = {}
        if func_name not in file_func_counts[cpp_filename]:
            file_func_counts[cpp_filename][func_name] = 0
        file_func_counts[cpp_filename][func_name] += 1

    return file_func_counts, dir_func_counts


def build_dir_func_counts(source_dir, file_func_counts):

    dir_func_counts = {}

    cpp_file_map = {}
    for root, dirs, files in os.walk(source_dir):
        for f in files:
            if f.endswith('.cpp'):
                if f not in cpp_file_map:
                    cpp_file_map[f] = []
                cpp_file_map[f].append(os.path.join(root, f))

    for bare_filename, func_dict in file_func_counts.items():
        if bare_filename not in cpp_file_map:
            continue
        full_path = cpp_file_map[bare_filename][0]
        folder_path = os.path.dirname(full_path)

        if folder_path not in dir_func_counts:
            dir_func_counts[folder_path] = {}

        for func_name, freq in func_dict.items():
            key = (bare_filename, func_name)
            if key not in dir_func_counts[folder_path]:
                dir_func_counts[folder_path][key] = 0
            dir_func_counts[folder_path][key] += freq

    return dir_func_counts

def compute_semantic_correlation(snippet_text, file_path,
                                 file_func_counts, dir_func_counts,
                                 alpha=2.0, beta=1.0):

    if not os.path.exists(file_path):
        return 0.0

    snippet_folder = os.path.dirname(file_path)
    snippet_basename = os.path.basename(file_path)

    if snippet_basename not in file_func_counts:
        return 0.0

    file_freqs = file_func_counts[snippet_basename]
    total_funcs_in_file = len(file_freqs)

    if total_funcs_in_file == 0:
        return 0.0

    newly_triggered_in_file = sum(1 for f, freq in file_freqs.items() if freq == 1)

    if snippet_folder not in dir_func_counts:
        return 0.0

    dir_freqs = dir_func_counts[snippet_folder]
    total_funcs_in_dir = len(dir_freqs)

    other_funcs_in_dir = total_funcs_in_dir - total_funcs_in_file
    if other_funcs_in_dir < 1:
        return alpha * (newly_triggered_in_file / total_funcs_in_file)

    newly_triggered_in_dir = sum(
        1 for (bfn, fname), freq in dir_freqs.items() if freq == 1
    )

    newly_in_file_set = set(
        (snippet_basename, func_name)
        for func_name, freq in file_freqs.items()
        if freq == 1
    )

    newly_triggered_other_in_dir = 0
    for (bfn, fname), freq in dir_freqs.items():
        if freq == 1:
            if (bfn, fname) not in newly_in_file_set:
                newly_triggered_other_in_dir += 1

    corr = alpha * (newly_triggered_in_file / total_funcs_in_file) \
         + beta * (newly_triggered_other_in_dir / other_funcs_in_dir)
    return corr

def extract_function_from_file(file_path, max_lines=100):

    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
        code = f.read()
    pattern = re.compile(
        r'(?:^|\n)([^\n]*?)\s+([^\s]+?)\s*\(([^\)]*?)\)\s*(const)?\s*\{', re.MULTILINE)
    matches = pattern.finditer(code)
    functions = []
    for match in matches:
        start = match.start()
        brace_count = 1
        index = match.end()
        while brace_count > 0 and index < len(code):
            if code[index] == '{':
                brace_count += 1
            elif code[index] == '}':
                brace_count -= 1
            index += 1
        function_code = code[start:index]
        function_lines = function_code.count('\n')
        if function_lines <= max_lines:
            functions.append(function_code)
    if functions:
        return random.choice(functions)
    else:
        return None

def get_all_cpp_files(source_dir):

    cpp_files = []
    for root, dirs, files in os.walk(source_dir):
        for file in files:
            if file.endswith('.cpp'):
                cpp_files.append(os.path.join(root, file))
    return cpp_files

def extract_random_function(source_dir, used_files_set, max_function_length=100):

    cpp_files = get_all_cpp_files(source_dir)
    available_files = [f for f in cpp_files if f not in used_files_set]
    if not available_files:
        print("All files have been used. Resetting used_files_set.")
        used_files_set.clear()
        available_files = cpp_files

    random.shuffle(available_files)
    for file_path in available_files:
        function_code = extract_function_from_file(file_path, max_function_length)
        if function_code:
            used_files_set.add(file_path)
            return function_code, file_path
    return None, None

def parse_pillm_line(line):
    match_brackets = re.search(r'\(start line:\s*(\d+),\s*end line:\s*(\d+)\)', line)
    if not match_brackets:
        return None, None, None
    start_line = int(match_brackets.group(1))
    end_line = int(match_brackets.group(2))

    match_cpp = re.search(r'([A-Za-z0-9_./\\-]+\.cpp)', line)
    if not match_cpp:
        return None, None, None
    filename = match_cpp.group(1)

    return filename, start_line, end_line

def find_file_in_source_dir(filename, source_dir):
    for root, dirs, files in os.walk(source_dir):
        if filename in files:
            return os.path.join(root, filename)
    return None

def extract_code_by_lines(filename, start_line, end_line, source_dir):
    full_path = find_file_in_source_dir(filename, source_dir)
    if not full_path:
        return None, None
    with open(full_path, 'r', encoding='utf-8', errors='ignore') as f:
        lines = f.readlines()
    start_index = max(0, start_line - 1)
    end_index = min(len(lines), end_line)
    snippet = lines[start_index:end_index]
    return "".join(snippet), full_path

def compare_files_line_by_line(lines_record, lines_pillm):
    i = len(lines_record) - 1
    j = len(lines_pillm) - 1
    while i >= 0 and j >= 0:
        if lines_record[i].rstrip('\n') != lines_pillm[j].rstrip('\n'):
            return j
        i -= 1
        j -= 1
    if len(lines_record) != len(lines_pillm):
        if len(lines_pillm) > len(lines_record):
            return j
        else:
            return None
    return None

def do_extract_code_snippet_once(source_dir, used_files_set):

    snippet = None
    file_path = None

    pillm_dump_file = 'pillm_dump.txt'
    extract_record_file = 'extract_record.txt'

    if not os.path.exists(pillm_dump_file):
        function_code, f_path = extract_random_function(source_dir, used_files_set)
        if function_code:
            snippet = function_code
            file_path = f_path
    else:
        if not os.path.exists(extract_record_file):
            with open(pillm_dump_file, 'r', encoding='utf-8') as f:
                lines_pillm = f.readlines()
            if not lines_pillm:
                function_code, f_path = extract_random_function(source_dir, used_files_set)
                if function_code:
                    snippet = function_code
                    file_path = f_path
            else:
                last_line = lines_pillm[-1].strip('\n')
                filename, start_line, end_line = parse_pillm_line(last_line)
                if not filename or not start_line or not end_line:
                    function_code, f_path = extract_random_function(source_dir, used_files_set)
                    if function_code:
                        snippet = function_code
                        file_path = f_path
                else:
                    snippet_text, full_path = extract_code_by_lines(filename, start_line, end_line, source_dir)
                    if snippet_text:
                        snippet = snippet_text
                        file_path = full_path
                    else:
                        function_code, f_path = extract_random_function(source_dir, used_files_set)
                        if function_code:
                            snippet = function_code
                            file_path = f_path

            shutil.copyfile(pillm_dump_file, extract_record_file)
        else:
            with open(pillm_dump_file, 'r', encoding='utf-8') as f:
                lines_pillm = f.readlines()
            with open(extract_record_file, 'r', encoding='utf-8') as f:
                lines_record = f.readlines()

            mismatch_index = compare_files_line_by_line(lines_record, lines_pillm)
            if mismatch_index is not None:
                line_of_interest = lines_pillm[mismatch_index].strip('\n')
                filename, start_line, end_line = parse_pillm_line(line_of_interest)
                if not filename or not start_line or not end_line:
                    function_code, f_path = extract_random_function(source_dir, used_files_set)
                    if function_code:
                        snippet = function_code
                        file_path = f_path
                else:
                    snippet_text, full_path = extract_code_by_lines(filename, start_line, end_line, source_dir)
                    if snippet_text:
                        snippet = snippet_text
                        file_path = full_path
                    else:
                        function_code, f_path = extract_random_function(source_dir, used_files_set)
                        if function_code:
                            snippet = function_code
                            file_path = f_path
            else:
                function_code, f_path = extract_random_function(source_dir, used_files_set)
                if function_code:
                    snippet = function_code
                    file_path = f_path

            shutil.copyfile(pillm_dump_file, extract_record_file)

    return snippet, file_path

def extract_code_snippet(
    source_dir,
    used_files_set,
    semantic_threshold=0.0,
    max_attempts=10,
    alpha=2.0,
    beta=1.0
):

    pillm_dump_path = 'pillm_dump.txt'

    file_func_counts, _ = parse_pillm_dump_file(pillm_dump_path)
    dir_func_counts = build_dir_func_counts(source_dir, file_func_counts)

    for attempt in range(max_attempts):
        snippet, snippet_path = do_extract_code_snippet_once(source_dir, used_files_set)
        if not snippet:
            continue

        corr = compute_semantic_correlation(
            snippet, snippet_path, file_func_counts, dir_func_counts, alpha, beta
        )

        if corr >= semantic_threshold:
            return snippet, snippet_path
        else:
            print(f"[Info] Attempt #{attempt+1}: correlation={corr:.2f} < threshold={semantic_threshold:.2f}. Trying again...")

    return None, None

if __name__ == '__main__':
    parser = argparse.ArgumentParser(
        description='Extract code snippet from JSC source code.'
    )
    parser.add_argument('--source', type=str, required=True,
                        help='Path to the JSC source code directory')
    parser.add_argument('--threshold', type=float, default=0.0,
                        help='Minimum semantic correlation threshold')
    parser.add_argument('--alpha', type=float, default=2.0,
                        help='Alpha weight for same-file correlation')
    parser.add_argument('--beta', type=float, default=1.0,
                        help='Beta weight for same-directory correlation')
    args = parser.parse_args()

    source_dir = args.source
    correlation_threshold = args.threshold

    used_files_set = set()

    snippet, file_path = extract_code_snippet(
        source_dir=source_dir,
        used_files_set=used_files_set,
        semantic_threshold=correlation_threshold,
        max_attempts=10,
        alpha=args.alpha,
        beta=args.beta
    )
    if snippet:
        print(f"\n[Result] Extracted snippet from: {file_path}")
        print("========================================")
        print(snippet)
        print("========================================\n")
    else:
        print("No suitable snippet found.")