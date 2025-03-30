import os
import re

# Define input and output directories
input_dir = "/ndata/cdp/fuzz4all/outputs/gpt4o_fuzzing_outputs"
output_dir = "/ndata/cdp/fuzz4all/outputs/processed_js_files"

# Create output directory if it doesn't exist
os.makedirs(output_dir, exist_ok=True)

# Iterate through all .fuzz files in the input directory
for filename in os.listdir(input_dir):
    if filename.endswith(".fuzz"):
        input_path = os.path.join(input_dir, filename)
        output_path = os.path.join(output_dir, filename.replace(".fuzz", ".js"))

        with open(input_path, "r") as infile:
            lines = infile.readlines()

        # Remove the first line ("print('Hello, world!');")
        lines = lines[1:]

        # Remove ```javascript and ``` markers
        cleaned_lines = [line for line in lines if not line.strip().startswith("```")]

        # Replace console.log with print
        processed_content = []
        for line in cleaned_lines:
            processed_line = re.sub(r"console\.log\((.*?)\);", r"print(\1);", line)
            processed_content.append(processed_line)

        # Write the processed content to the new file
        with open(output_path, "w") as outfile:
            outfile.writelines(processed_content)

print(f"Processed files have been saved to {output_dir}")

