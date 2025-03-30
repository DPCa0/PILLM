class AsyncCalculator {
  constructor() {
    this.history = [];
  }

  async calculate(expression) {
    try {
      const result = await this.#evaluate(expression);
      this.history.push({ expression, result });
      return result;
    } catch (error) {
      console.error('Error in calculation:', error);
      throw new Error('Invalid expression');
    }
  }

  async #evaluate(expression) {
    const safeEval = (exp) => Function('"use strict";return (' + exp + ')')();
    return new Promise((resolve, reject) => {
      try {
        const sanitizedExpression = expression.replace(/[^\d+\-*/().]/g, '');
        const result = safeEval(sanitizedExpression);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  [Symbol.iterator]() {
    let index = 0;
    const history = this.history;
    return {
      next() {
        if (index < history.length) {
          return { value: history[index++], done: false };
        } else {
          return { done: true };
        }
      },
    };
  }
}

(async () => {
  const calculator = new AsyncCalculator();
  const expressions = ['3 + 5', '12 / 4', '(2 * 3) + 1'];

  for await (const expr of expressions) {
    print(`Result of "${expr}" is ${await calculator.calculate(expr)}`);
  }

  print('Calculation history:');
  for (const record of calculator) {
    print(record);
  }
})();
