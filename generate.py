import openai
import json
import os
import time
import fuzz
import argparse
import subprocess
import tempfile
import glob
import random
import extract_functions

def is_code_valid(code, jsc_path):
    with tempfile.NamedTemporaryFile(mode='w', delete=False, suffix='.js') as js_file:
        js_file.write(code)
        js_file_path = js_file.name
    try:
        process = subprocess.Popen(
            [jsc_path, js_file_path],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
        )
        stdout, stderr = process.communicate(timeout=5)
        stderr_decoded = stderr.decode(errors='replace')
        if 'SyntaxError' in stderr_decoded or 'ReferenceError' in stderr_decoded:
            return False
        else:
            return True
    except subprocess.TimeoutExpired:
        process.kill()
        return False
    finally:
        os.remove(js_file_path)

def generate_javascript_code(feedback, model, jsc_path, strategy, previous_code=None, extracted_function=None):
    if strategy == 'generate':
        prompt = (
            "Generate JavaScript code that will invoke and test the following C++ function "
            "from the JavaScriptCore (JSC) engine:\n\n"
            f"{extracted_function}\n\n"
            "The generated JavaScript code should be designed to trigger this function, "
            "potentially exploring its edge cases or causing it to behave unexpectedly. "
            "Ensure the code is syntactically correct, avoids ReferenceErrors, "
            "and does not use 'console.log'. Provide only the JavaScript code without "
            "any explanations or code comments."
        )

        if feedback and feedback.get('bug_type') == 'crash':
            crash_code = feedback.get('test_code', '')
            prompt += (
                "\n\nNote: The previous test caused a crash. Here is the code that caused it:\n"
                f"{crash_code}\n"
                "Use this information to generate new test cases that might explore similar or "
                "related code paths, but avoid exact duplication."
            )

    elif strategy == 'mutate':
        prompt = (
            "Mutate the following JavaScript code to fuzz the JavaScriptCore (JSC). "
            "Focus on changes that could lead to more complex function calls, unexpected behaviors, "
            "or crashes. Please ensure the code can pass the syntax check of JSC, avoid ReferenceErrors, "
            "and does not use 'console.log'. Provide only the mutated JavaScript code without any explanations "
            "or code comments."
        )
        prompt += f"\n\nOriginal Code:\n{previous_code}"

        if feedback and feedback.get('bug_type') == 'crash':
            crash_code = feedback.get('test_code', '')
            prompt += (
                "\n\nNote: The previous mutation resulted in a crash. Here is the code that caused it:\n"
                f"{crash_code}\n"
                "Use this information to guide your mutations, potentially exploring similar code paths "
                "while avoiding exact duplication."
            )
    else:
        raise ValueError(f"Unknown strategy: {strategy}")

    max_retries = 3
    for attempt in range(max_retries):
        try:
            response = openai.ChatCompletion.create(
                model=model,
                messages=[{'role': 'user', 'content': prompt}],
                max_tokens=2048,
                n=1,
                temperature=0.7,
            )
        except openai.error.OpenAIError as e:
            print(f"OpenAI API error: {e}")
            time.sleep(5)
            continue

        javascript_code = response['choices'][0]['message']['content'].strip()

        if javascript_code.startswith('```'):
            javascript_code = javascript_code.strip('`')
            lines = javascript_code.split('\n')
            if lines and lines[0].startswith('javascript'):
                lines = lines[1:]
            javascript_code = '\n'.join(lines)

        if is_code_valid(javascript_code, jsc_path):
            return javascript_code
        else:
            print("Generated code has syntax errors or ReferenceErrors. Retrying...")
            prompt += (
                "\n\nThe previous code had syntax errors or ReferenceErrors. "
                "Please regenerate the code ensuring it is syntactically correct and avoids ReferenceErrors."
            )

    print("Failed to generate syntactically valid code after multiple attempts.")
    return None

def main():
    parser = argparse.ArgumentParser(description='JavaScriptCore Fuzzer')
    parser.add_argument('--version', type=str, default='gpt-4', help='GPT model version to use')

    parser.add_argument('--pillm-path', type=str, required=True,
                        help='Path to the statically-instrumented JSC that generates pillm_dump.txt')
    parser.add_argument('--coverage-path', type=str, required=True,
                        help='Path to the IR-based instrumented JSC (Fuzzilli) for coverage')

    parser.add_argument('--log', type=str, default='output', help='Path to save the logs and outputs')
    parser.add_argument('--time', type=int, default=None, help='Run duration in minutes (optional)')
    parser.add_argument('--resume', action='store_true', help='Resume from the last state')
    parser.add_argument('--source', type=str, help='Path to the JSC source code directory')
    parser.add_argument('--mutate', action='store_true', help='Use only mutate strategy')
    args = parser.parse_args()

    openai.api_key = os.getenv("OPENAI_API_KEY")
    if openai.api_key is None:
        print("Error: OPENAI_API_KEY environment variable not set.")
        return

    output_folder = args.log
    os.makedirs(output_folder, exist_ok=True)
    print(f"Using output folder: {output_folder}")

    iteration = 0
    feedback = None
    state_file = os.path.join(output_folder, 'state.json')
    no_coverage_increase_count = 0
    strategy = 'generate' if not args.mutate else 'mutate'
    previous_code = None
    used_files_set = set()
    mutate_js_files = []
    current_mutation_file = None

    if args.resume and os.path.exists(state_file):
        with open(state_file, 'r') as f:
            state = json.load(f)
            iteration = state.get('iteration', 0)
            feedback = state.get('feedback', None)
            no_coverage_increase_count = state.get('no_coverage_increase_count', 0)
            strategy = state.get('strategy', strategy)
            previous_code = state.get('previous_code', None)
            used_files_set = set(state.get('used_files_set', []))
            mutate_js_files = state.get('mutate_js_files', [])
            current_mutation_file = state.get('current_mutation_file', None)
        print("Resuming from the last state.")
    else:
        print("Starting a new session.")
        if os.path.exists(os.path.join(output_folder, 'coverage_bitmap.dat')):
            os.remove(os.path.join(output_folder, 'coverage_bitmap.dat'))
            print("Removed existing coverage bitmap to start fresh.")
        if os.path.exists(os.path.join(output_folder, 'coverage_log.csv')):
            os.remove(os.path.join(output_folder, 'coverage_log.csv'))
            print("Removed existing coverage log to start fresh.")
        if os.path.exists(os.path.join(output_folder, 'coverage_heatmap.png')):
            os.remove(os.path.join(output_folder, 'coverage_heatmap.png'))
            print("Removed existing coverage heatmap to start fresh.")

    fuzz.load_coverage_bitmap(output_folder)

    if args.mutate:
        mutate_js_files = glob.glob(os.path.join(output_folder, 'generated_*.js'))
        if not mutate_js_files:
            print("No previously generated JS files found for mutation.")
            return
        print(f"Found {len(mutate_js_files)} JS files for mutation.")

    start_time = time.time()
    run_duration = args.time * 60 if args.time else None

    while True:
        if run_duration and (time.time() - start_time) >= run_duration:
            print(f"Run duration of {args.time} minutes reached. Stopping.")
            break

        print(f"\n--- Iteration {iteration} ---")

        if args.mutate:
            strategy = 'mutate'
            if no_coverage_increase_count >= 2 or previous_code is None:
                current_mutation_file = random.choice(mutate_js_files)
                with open(current_mutation_file, 'r') as f:
                    previous_code = f.read()
                print(f"Selected new JS file for mutation: {current_mutation_file}")
                no_coverage_increase_count = 0
        else:
            if strategy == 'generate' and previous_code is not None:
                strategy = 'mutate'
                print("Switching strategy to 'mutate'")
            elif strategy == 'mutate' and no_coverage_increase_count >= 2:
                strategy = 'generate'
                print("Switching strategy to 'generate'")
                no_coverage_increase_count = 0
            elif strategy == 'mutate':
                pass
            else:
                strategy = 'generate'

        extracted_function = None

        if strategy == 'generate':
            if not args.source:
                print("Error: --source argument is required for generate strategy.")
                return
            snippet, snippet_file = extract_functions.extract_code_snippet(
                args.source, used_files_set
            )
            if snippet is None:
                print("No suitable functions found in the source code. Exiting.")
                break
            print(f"Extracted function from {snippet_file}")
            extracted_function = snippet

        javascript_code = generate_javascript_code(
            feedback=feedback,
            model=args.version,
            jsc_path=args.coverage_path,
            strategy=strategy,
            previous_code=previous_code,
            extracted_function=extracted_function
        )

        if javascript_code is None:
            print("Skipping iteration due to invalid code.")
            no_coverage_increase_count += 1
            iteration += 1
            continue

        print("Generated JavaScript Code:")
        print(javascript_code)

        timestamp = time.strftime('%Y%m%d_%H%M%S')
        js_filename = f'generated_{timestamp}.js'
        js_filepath = os.path.join(output_folder, js_filename)
        with open(js_filepath, 'w') as js_file:
            js_file.write(javascript_code)
        print(f"Saved generated code to {js_filepath}")

        if args.mutate:
            mutate_js_files.append(js_filepath)

        print(f"Running with PILLM JSC: {args.pillm_path}")
        fuzz.run_test(
            javascript_code,
            output_folder,
            jsc_path=args.pillm_path,
            iteration=iteration,
            pillm_run=True
        )

        print(f"Running with Coverage JSC: {args.coverage_path}")
        record_data = fuzz.run_test(
            javascript_code,
            output_folder,
            jsc_path=args.coverage_path,
            iteration=iteration,
            pillm_run=False
        )

        if record_data is None:
            print("Failed to get output from fuzz.py for coverage run.")
            feedback = None
            no_coverage_increase_count += 1
        else:
            print(f"Feedback from fuzz.py: {record_data}")
            feedback = {**record_data}
            feedback['average_execution_time'] = (
                fuzz.metrics['total_execution_time'] / fuzz.metrics['total_executions']
                if fuzz.metrics['total_executions'] > 0 else 0
            )
            feedback['total_crashes'] = fuzz.metrics['total_crashes']
            feedback['total_timeouts'] = fuzz.metrics['total_timeouts']
            feedback['unique_bugs'] = len(fuzz.metrics['unique_bug_types'])

            if record_data.get('new_edges', 0) == 0:
                no_coverage_increase_count += 1
            else:
                no_coverage_increase_count = 0

            stderr = record_data.get('stderr', '')
            if 'ReferenceError' in stderr:
                print("ReferenceError detected in stderr.")
                if not args.mutate:
                    strategy = 'generate'
                    no_coverage_increase_count = 0
                feedback['stderr'] = stderr

        previous_code = javascript_code

        state = {
            'iteration': iteration + 1,
            'feedback': feedback,
            'no_coverage_increase_count': no_coverage_increase_count,
            'strategy': strategy,
            'previous_code': previous_code,
            'used_files_set': list(used_files_set),
            'mutate_js_files': mutate_js_files,
            'current_mutation_file': current_mutation_file,
        }
        with open(state_file, 'w') as f:
            json.dump(state, f)

        iteration += 1

    print("Fuzzing session completed.")

if __name__ == '__main__':
    main()