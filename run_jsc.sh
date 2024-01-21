#!/bin/bash

# Replace "/path/to/jsc" with the actual path to the jsc shell executable
JSC_SHELL="/path/to/jsc"

# Check if the jsc shell exists and is executable
if [ ! -x "$JSC_SHELL" ]; then
    echo "Error: jsc shell not found or not executable at $JSC_SHELL"
    exit 1
fi

# Run the jsc shell and redirect the output to log.txt
$JSC_SHELL 2>&1 | tee log.txt

