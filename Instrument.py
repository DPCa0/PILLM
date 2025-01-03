import os
import regex as re

print_counter = 1

def create_instrumentation_header(root_dir):

    instrumentation_header_path = os.path.join(root_dir, "PILLMInstrumentation.h")

    header_content = r'''#ifndef PILLM_INSTRUMENTATION_H
#define PILLM_INSTRUMENTATION_H

#include <atomic>
#include <fstream>
#include <mutex>
#include <algorithm> // for std::max
#include <cstring>   // for strncpy

#ifdef __cplusplus
extern "C" {
#endif

// We store integer markers here, if desired.
inline std::atomic<int> g_pillm_map[100000] = {};

// We'll track the last 100 function calls.
struct FunctionRecord {
    int startLine;
    int endLine;
    int executionIndex; // increments each time a function is recorded
    char fileName[128];
    char functionName[128];
};

inline FunctionRecord s_functionRecords[100] = {};
inline std::atomic<int> s_functionIndex(0);
inline std::mutex s_dumpMutex;

// Store the function start/end lines, plus file and function names.
inline void pillm_store_function(int startLine, int endLine,
                                 const char* fileName, const char* functionName)
{
    // Atomically increment the function index, then store into ring buffer
    int index = s_functionIndex.fetch_add(1, std::memory_order_relaxed);
    int slot = index % 100;

    {
        std::lock_guard<std::mutex> lock(s_dumpMutex);
        s_functionRecords[slot].startLine = startLine;
        s_functionRecords[slot].endLine   = endLine;
        s_functionRecords[slot].executionIndex = index + 1;

        // Copy fileName and functionName into the ring buffer record
        std::strncpy(s_functionRecords[slot].fileName, fileName, 127);
        s_functionRecords[slot].fileName[127] = '\0';

        std::strncpy(s_functionRecords[slot].functionName, functionName, 127);
        s_functionRecords[slot].functionName[127] = '\0';
    }
}

// Dump the last 100 function records to pillm_dump.txt
inline void pillm_dump_last_100()
{
    std::lock_guard<std::mutex> lock(s_dumpMutex);

    std::ofstream outFile("pillm_dump.txt", std::ios::out | std::ios::trunc);
    if (!outFile)
        return;

    int total = s_functionIndex.load(std::memory_order_relaxed);
    // Only print the last 100
    int start = std::max(0, total - 100);
    for (int i = start; i < total; i++) {
        int slot = i % 100;
        const auto& record = s_functionRecords[slot];
        outFile << "[Execution #" << record.executionIndex << "] "
                << record.fileName << "::" << record.functionName
                << " (start line: " << record.startLine
                << ", end line: " << record.endLine
                << ")" << std::endl;
    }
}

// A static destructor that flushes the ring buffer to pillm_dump.txt at shutdown.
struct PillmDumper {
    ~PillmDumper() {
        pillm_dump_last_100();
    }
};

// Create one global instance of PillmDumper in each translation unit.
inline PillmDumper s_dumper;

#ifdef __cplusplus
}
#endif

#endif // PILLM_INSTRUMENTATION_H
'''

    with open(instrumentation_header_path, 'w') as f:
        f.write(header_content)

def add_instrumentation_include(filepath):

    with open(filepath, 'r') as file:
        content = file.read()

    if '#include "PILLMInstrumentation.h"' not in content:
        content = '#include "PILLMInstrumentation.h"\n' + content

    with open(filepath, 'w') as file:
        file.write(content)

def check_define_pattern(content, start_brace_index):

    define_pattern = re.compile(r'^\s*#define\s+')
    if 0 <= (start_brace_index - 1) < len(content):
        if define_pattern.match(content[start_brace_index - 1]):
            return True
    if 0 <= start_brace_index < len(content):
        if define_pattern.match(content[start_brace_index]):
            return True
    return False

def get_function_name(content, start_brace_index):

    max_lines_up = 5
    function_name_pattern = re.compile(r'([A-Za-z_~][A-Za-z0-9_:~]*)\s*\(')
    start_line = max(0, start_brace_index - max_lines_up)
    for i in range(start_brace_index, start_line - 1, -1):
        line_content = content[i].strip()
        match = function_name_pattern.search(line_content)
        if match:
            return match.group(1)
    return "UnknownFunction"

def modify_functions(filepath):
    with open(filepath, 'r') as file:
        lines = file.readlines()

    lines = [
        re.sub(r'\s*(?!//")(?!//.+\\n")//(?! anonymous namespace)(?! namespace\b).*', '', line)
        for line in lines
    ]
    content_string = ''.join(lines)

    block_comment_pattern = re.compile(
        r'/\*(?! .*?@begin.*? .*?@end.*? )'
        r'(?:(?!\*/)(?:(?!\*\*\/)[\s\S])|(?!\*\*\/)\*\*(?!\/[\s\S]))*\*/',
        re.MULTILINE | re.DOTALL
    )
    content_string = block_comment_pattern.sub('', content_string)

    content = content_string.splitlines(True)

    return_code_pattern = re.compile(r'^(\s*)return(?:\s+|;)(.*?)(;?)(\s*)$', re.MULTILINE)
    return_pattern = re.compile(r'\breturn\b(?:\s*;|\s)')

    modified_content = ''
    filter_pattern = False

    filename = os.path.basename(filepath)

    for index, line in enumerate(content):
        if '#define ' in line and ' return' in line:
            filter_pattern = True

        if return_code_pattern.match(line) and not filter_pattern and not line.strip().endswith('\\'):
            instrumentation_code, _ = insert_memory_statement(
                index, line, content, filename
            )
            if instrumentation_code:
                modified_content += instrumentation_code

        if (
            index > 0
            and ' if ' in content[index - 1]
            and return_pattern.search(line)
            and not content[index - 1].strip().endswith('\\')
            and not line.strip().endswith('\\')
            and '#define ' not in content[index - 1]
            and '#define ' not in line
        ):
            if line.strip().endswith(';'):
                line = line.rstrip() + ' }\n'

        if (
            (index + 1) < len(content)
            and ' if ' in line
            and return_pattern.search(content[index + 1])
            and not line.strip().endswith('\\')
            and not content[index + 1].strip().endswith('\\')
            and '#define ' not in line
            and '#define ' not in content[index + 1]
        ):
            if content[index + 1].strip().endswith(';'):
                line = line.rstrip() + ' {\n'

        if (
            index > 0
            and ' else' in content[index - 1]
            and 'else if' not in content[index - 1]
            and return_pattern.search(line)
            and not content[index - 1].strip().endswith('\\')
            and not line.strip().endswith('\\')
            and '#define ' not in content[index - 1]
            and '#define ' not in line
        ):
            if line.strip().endswith(';'):
                line = line.rstrip() + ' }\n'

        if (
            (index + 1) < len(content)
            and ' else' in line
            and 'else if' not in line
            and return_pattern.search(content[index + 1])
            and not line.strip().endswith('\\')
            and not content[index + 1].strip().endswith('\\')
            and '#define ' not in line
            and '#define ' not in content[index + 1]
        ):
            if content[index + 1].strip().endswith(';'):
                line = line.rstrip() + ' {\n'

        modified_content += line

    with open(filepath, 'w') as f:
        f.write(modified_content)

def insert_memory_statement(return_index, return_line, content, filename):
    global print_counter

    start_brace_index, end_brace_index = find_function_braces(return_index, content)

    if check_define_pattern(content, start_brace_index):
        return "", print_counter

    function_code = extract_function_code(content, start_brace_index, end_brace_index)

    if ("static_assert" in function_code
            or "constexpr" in function_code
            or "#define" in function_code
            or ("@begin" in function_code and "@end" in function_code)):
        return "", print_counter

    func_name = get_function_name(content, start_brace_index)

    start_line_number = start_brace_index + 1
    end_line_number = end_brace_index + 1

    indentation = re.match(r'\s*', return_line).group(0)

    safe_func_name = func_name.replace('\\', '\\\\').replace('"', '\\"')
    safe_file_name = filename.replace('\\', '\\\\').replace('"', '\\"')

    instrumentation_code = (
        f'{indentation}g_pillm_map[{print_counter}].store(__LINE__, std::memory_order_relaxed);\n'
        f'{indentation}pillm_store_function({start_line_number}, {end_line_number}, "{safe_file_name}", "{safe_func_name}");\n'
    )
    print_counter += 1

    return instrumentation_code, print_counter

def find_function_braces(return_index, content):

    brace_stack = []
    line = content[return_index].strip()
    open_brace_count = sum(1 for ch in line if ch == '{')

    i = return_index
    while i < len(content):
        for ch in content[i]:
            if ch == '}':
                brace_stack.append('}')
                if open_brace_count > 0:
                    open_brace_count -= 1
                    brace_stack.pop()
        if open_brace_count == 0 and brace_stack:
            break
        i += 1
    end_brace_index = i

    i = return_index - 1
    while i >= 0:
        for ch in content[i]:
            if ch == '{':
                if brace_stack:
                    brace_stack.pop()
            if ch == '}':
                brace_stack.append('}')
        if not brace_stack:
            break
        i -= 1
    start_brace_index = i - 1

    if start_brace_index < 0:
        start_brace_index = 0
    if end_brace_index >= len(content):
        end_brace_index = len(content) - 1

    return start_brace_index, end_brace_index


def extract_function_code(content, start_brace_index, end_brace_index):

    snippet = content[start_brace_index:end_brace_index+1]
    return ''.join(snippet)

def process_cpp_files(root_dir):

    global print_counter
    create_instrumentation_header(root_dir)

    for root, dirs, files in os.walk(root_dir):
        if 'jit' in root.split(os.path.sep):
            continue

        for file in files:
            if file.endswith('.cpp'):
                filepath = os.path.join(root, file)
                add_instrumentation_include(filepath)
                modify_functions(filepath)

    return print_counter

def main():
    import argparse
    parser = argparse.ArgumentParser(description='Instrument JSC with PILLM instrumentation.')
    parser.add_argument('--source', type=str, required=True,
                        help='Path to the JavaScriptCore (or WebKit) source code directory.')
    args = parser.parse_args()

    global print_counter
    final_count = process_cpp_files(args.source)
    print(f"[PILLM] Total instrumentation sites inserted: {final_count - 1}")


if __name__ == '__main__':
    main()
