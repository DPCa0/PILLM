 
class Calculator {
  #lastResult = null;
  
  static #operationMap = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b
  };

  calculate(expr) {
     
    return this.#evaluate(expr);
  }

  #evaluate(strings, ...values) {
    const expression = strings.reduce((acc, part, i) => acc + part + (values[i] !== undefined ? values[i] : ''), '');
    const result = new Function('ops', `with(ops) { return (${expression}); }`)(Calculator.#operationMap);
    this.#lastResult = result;
    return result;
  }

  get lastResult() {
    return this.#lastResult;
  }
}

 
const handler = {
  get(target, propKey, receiver) {
    const origMethod = target[propKey];
    if (typeof origMethod === 'function') {
      return function(...args) {
        print(`Calling ${propKey} with arguments: ${JSON.stringify(args)}`);
        const result = origMethod.apply(this, args);
        print(`Result of ${propKey}: ${result}`);
        return result;
      };
    }
    return origMethod;
  }
};

const calc = new Proxy(new Calculator(), handler);

 
async function main() {
  try {
    const addResult = await Promise.resolve(calc.calculate`10 + 5`);
    print(`Add Result: ${addResult}`);
  
    const subResult = await Promise.resolve(calc.calculate`${addResult} - 3`);
    print(`Sub Result: ${subResult}`);

    const mulResult = await Promise.resolve(calc.calculate`${subResult} * 2`);
    print(`Mul Result: ${mulResult}`);

    const divResult = await Promise.resolve(calc.calculate`${mulResult} / 4`);
    print(`Div Result: ${divResult}`);
  } catch (error) {
    console.error(`Error in computation: ${error.message}`);
  }
}

main();
