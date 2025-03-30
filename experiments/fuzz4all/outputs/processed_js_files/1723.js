class AsyncCalculator {
  constructor() {
    this.cache = new Map();
  }

  async compute(expression) {
    if (this.cache.has(expression)) {
      print('Fetching from cache...');
      return this.cache.get(expression);
    }
    
    print('Computing...');
    const result = await this._evaluate(expression);
    this.cache.set(expression, result);
    return result;
  }

  _evaluate(expression) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const func = new Function('return ' + expression);
          resolve(func());
        } catch (error) {
          reject(new Error('Invalid expression'));
        }
      }, 1000);
    });
  }
}

(async () => {
  const calculator = new AsyncCalculator();

  try {
    const result1 = await calculator.compute("5 * 10");
    print(`Result: ${result1}`);

    const result2 = await calculator.compute("5 * 10");  
    print(`Result: ${result2}`);

    const result3 = await calculator.compute("100 / 0");  
    print(`Result: ${result3}`);
  } catch (error) {
    console.error(error.message);
  }
})();
