import os
import regex as re

print_counter = 1


# include<iostream> is required for std::cout
def add_iostream_include(filepath):
    with open(filepath, 'r') as file:
        content = file.read()

    if not '#include <iostream>' in content:
        content = '#include <iostream>\n' + content

    with open(filepath, 'w') as file:
        file.write(content)


# Filter #define exists in the same line or the line before the function header
def check_define_pattern(content, start_brace_index):
    define_pattern = re.compile(r'^\s*#define\s+')
    if define_pattern.match(content[start_brace_index]) or define_pattern.match(content[start_brace_index - 1]):
        return True
    return False


def modify_functions(filepath):

    with open(filepath, 'r') as file:
        # content read as list of lines
        content = file.readlines()

    # Remove comments starting with // in the same line as the code
    content = [re.sub(r'\s*(?!//")(?!//.+\\n")//(?! anonymous namespace)(?! namespace\b).*', '', line) for line in content]
    content_string = ''.join(content)

    # Remove the specific block comment for /* */ comments
    block_comment_pattern = re.compile(
        r'/\*(?! .*?@begin.*? .*?@end.*? )(?:(?!\*/)(?:(?!\*\*\/)[\s\S])|(?!\*\*\/)\*\*(?!\/[\s\S]))*\*/',
        re.MULTILINE | re.DOTALL
    )
    content_string = block_comment_pattern.sub('', content_string)

    content = content_string.splitlines(True)

    # return_code_pattern find the return statement in the code
    return_code_pattern = re.compile(r'^(\s*)return(?:\s+|;)(.*?)(;?)(\s*)$', re.MULTILINE)
    # return_pattern used to match return pattern to add braces for if-else statements
    return_pattern = re.compile(r'\breturn\b(?:\s*;|\s)')

    modified_content = ''
    filter_pattern = False

    for index, line in enumerate(content):
        # If #define pattern found in the same line of return, do not insert print statement
        if '#define ' in content[index] and ' return' in content[index]:
            filter_pattern = True

        if return_code_pattern.match(line) and not filter_pattern and not line.strip().endswith('\\'):
            modified_line, print_counter = insert_print_statement(index, line, content, filepath)
            modified_content += modified_line
        # add braces for if-else statements
        if (
                index > 0
                and ' if ' in content[index - 1]
                # and not 'if constexpr' in content[index - 1]
                and return_pattern.search(content[index])
                and not content[index - 1].strip().endswith('\\')
                and not content[index].strip().endswith('\\')
                and not '#define ' in content[index - 1]
                and not '#define ' in content[index]
        ):
            if content[index].strip().endswith(';'):
                line = line.rstrip() + ' }\n'
        if (
                index + 1 < len(content)
                and ' if ' in content[index]
                # and not 'if constexpr' in content[index]
                and return_pattern.search(content[index + 1])
                and not content[index].strip().endswith('\\')
                and not content[index + 1].strip().endswith('\\')
                and not '#define ' in content[index]
                and not '#define ' in content[index + 1]
        ):
            if content[index + 1].strip().endswith(';'):
                line = line.rstrip() + ' {\n'
        if (
            index > 0
            and ' else' in content[index - 1]
            and not 'else if' in content[index - 1]
            and return_pattern.search(content[index])
            and not content[index - 1].strip().endswith('\\')
            and not content[index].strip().endswith('\\')
            and not '#define ' in content[index - 1]
            and not '#define ' in content[index]
        ):
            if content[index].strip().endswith(';'):
                line = line.rstrip() + ' }\n'
        if (
                index + 1 < len(content)
                and ' else' in content[index]
                and not 'else if' in content[index]
                and return_pattern.search(content[index + 1])
                and not content[index].strip().endswith('\\')
                and not content[index + 1].strip().endswith('\\')
                and not '#define ' in content[index]
                and not '#define ' in content[index + 1]
        ):
            if content[index + 1].strip().endswith(';'):
                line = line.rstrip() + ' {\n'
        modified_content += line

    with open(filepath, 'w') as file:
        file.writelines(modified_content)


def insert_print_statement(return_index, return_line, content, filepath):
    global print_counter
    filename = os.path.basename(filepath)

    start_brace_index, end_brace_index = find_function_braces(return_index, content)

    # If #define pattern found, do not insert print statement
    if check_define_pattern(content, start_brace_index):
        return "", print_counter

    function_code = extract_function_code(content, start_brace_index, end_brace_index)

    # filter translate special characters
    function_code = function_code.replace('\n', '\\n').replace('"', '\\"')
    function_code = function_code.replace('\\\\\"', '\\\"')
    function_code = function_code.replace('\\\\"', '\\"')
    # add indentation to the print statement
    indentation = re.match(r'\s*', return_line).group(0)
    print_statement = f'{indentation}std::cout << "[{print_counter}] PILLM Execution Detected in: "<< __FILE__ << " " << __LINE__ << " " << __func__ << "\\n" << std::endl;\n'
    print_counter += 1
    # for syntax with '\', add '\' at the end of print statement to avoid compile error
    if return_index > 0 and content[return_index - 1].strip().endswith('\\'):
        print_statement = print_statement[:-1]
        print_statement += ' \\\n'

    # If "static_assert", "constexpr", "#define" pattern exists in function_code, do not insert print statement
    if "static_assert" in function_code or "constexpr" in function_code or "#define" in function_code:
        return "", print_counter
    if "@begin" and "@end" in function_code:
        return "", print_counter
    # If "switch" or "case" pattern exists in function_code, add '//fallthrough' to avoid compile error
    if " switch " in function_code or " case " in function_code or "case " in function_code:
        print_statement += '//fallthrough\n'

    return print_statement, print_counter


def find_function_braces(return_index, content):
    brace_stack = []
    line = content[return_index].strip()
    flag = 0
    for j in range(0, len(line)):
        if line[j] == '{':
            flag += 1

    i = return_index

    while i < len(content):
        line = content[i].strip()
        for j in range(0, len(line)):
            if line[j] == '}':
                brace_stack.append('}')
                if flag > 0:
                    flag -= 1
                    brace_stack.pop()
        if flag == 0 and brace_stack != []:
            break
        i += 1

    end_brace_index = i
    i = return_index - 1

    while i >= 0:
        line = content[i].strip()
        for j in range(0, len(line)):
            if line[j] == '{':
                if not brace_stack == []:
                    brace_stack.pop()
            if line[j] == '}':
                brace_stack.append('}')
        if brace_stack == []:
            break
        i -= 1

    start_brace_index = i - 1

    return start_brace_index, end_brace_index


def extract_function_code(content, start_brace_index, end_brace_index):
    function_code = ''.join(content[start_brace_index:end_brace_index + 1]).strip()

    return function_code


def process_cpp_files(root_dir):
    global print_counter
    for root, _, files in os.walk(root_dir):
        if 'jit' in root.split(os.path.sep):
            continue  # Skip processing files under the "jit" folder
        for file in files:
            if file.endswith('.cpp'):
                filepath = os.path.join(root, file)
                add_iostream_include(filepath)
                modify_functions(filepath)
    return print_counter


source_directory = 'path/to/Webkit/78/Source/JavaScriptCore'
final_print_counter = process_cpp_files(source_directory)
print(f"Total counter numbers after processing all cpp files: {final_print_counter - 1}")
