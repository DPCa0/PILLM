# PILLM  
Program Interoperable Large Language Model Software Testing Scheme.  

We will show how to use our instrument script, in the experimental environment we are using webkit versions webkitgtk-2.39.3 and webkitgtk-2.41.6+. We build jsc shell for fuzzing on Ubuntu 20.04 LTS.

## Step 1: Download the Webkit Source Code
Refer to the following link to build the webkit source code:
https://github.com/WebKit/WebKit

## Step 2: Build the JSC Shell
Refer to the following link to build the jsc shell:
https://docs.webkit.org/Build%20%26%20Debug/BuildOptions.html


## Step 3: Run the Instrument Script

```bash
python3 instrument.py
```

## Step 4: Run the JSC Shell
```bash
sh run_jsc.sh
```