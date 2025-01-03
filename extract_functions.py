import os
import re
import random
import argparse
import shutil

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

def extract_code_snippet(source_dir, used_files_set):
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

if __name__ == '__main__':
    parser = argparse.ArgumentParser(
        description='Extract code snippet from JSC source code based on pillm_dump.txt or at random.')
    parser.add_argument('--source', type=str, required=True, help='Path to the JSC source code directory')
    args = parser.parse_args()

    source_dir = args.source
    used_files_set = set()

    snippet, file_path = extract_code_snippet(source_dir, used_files_set)
    if snippet:
        print(f"Extracted snippet from: {file_path}\n")
        print(snippet)
    else:
        print("No suitable snippet found.")