# PILLM

Program Interoperable Large Language Model Software Testing Scheme.

We now publish our source code! We have verified that our scheme works on webkitgtk-2.41.6.

We will show how to build and run our project, our experiments were conducted on Ubuntu 20.04 LTS with Clang 16.0.6 and Python 3.10.15.

## Usage

### 1. **Download the Webkit Source Code**

Refer to the following link to build the webkit source code: [https://github.com/WebKit/WebKit](https://github.com/WebKit/WebKit)

### 2. **Run the Instrument Script**

```jsx
python instrument.py --source /path/to/WebKit/Source/JavaScriptCore/
```

### 3. **Run the build-jsc Script under Webkit Root Path**

```jsx
python build-jsc
```

### 4. **Export the OpenAI API Key**

```jsx
export OPENAI_API_KEY="your-api-key"
```

### 5. **Run**

```jsx
python generate.py   
--version gpt-4o [or other model]   
--pillm-path /path/to/static_instrumented/jsc   
--coverage-path /path/to/IR_instrumented/jsc   
--log /path/to/log   
--source /path/to/webkit/Source/JavaScriptCore
```

For the IR instrumentation build, please refer the [fuzzilli’s](https://github.com/googleprojectzero/fuzzilli/tree/main/Targets/JavaScriptCore) patch or other tools.

You can see the following outputs if it successfully runs.

