class Calculator {
  constructor() {
    this.operators = {
      '+': (a, b) => a + b,
      '-': (a, b) => a - b,
      '*': (a, b) => a * b,
      '/': (a, b) => a / b,
    };
  }

  calculate(expression) {
    const tokenize = (expr) => expr.match(/(\d+|\+|\-|\*|\/)/g);
    const tokens = tokenize(expression);

    const evaluate = (tokens) => {
      const opsStack = [];
      const valsStack = [];
      
      tokens.forEach((token) => {
        if (/\d+/.test(token)) {
          valsStack.push(Number(token));
        } else if (Object.keys(this.operators).includes(token)) {
          opsStack.push(token);
        }

        if (valsStack.length >= 2 && opsStack.length) {
          const b = valsStack.pop();
          const a = valsStack.pop();
          const op = opsStack.pop();
          valsStack.push(this.operators[op](a, b));
        }
      });

      return valsStack[0];
    };

    return evaluate(tokens);
  }
}

const asyncCalculation = async (expression) => {
  const calc = new Calculator();

  const promiseBasedTimeout = (result, delay) =>
    new Promise((resolve) => setTimeout(() => resolve(result), delay));

  return promiseBasedTimeout(calc.calculate(expression), 1000);
};

(async () => {
  try {
    const expression = '3 + 5 * 2 - 4 / 2';
    print(`Calculating: ${expression}`);
    const result = await asyncCalculation(expression);
    print(`Result: ${result}`);
  } catch (error) {
    console.error('Error:', error);
  }
})();
