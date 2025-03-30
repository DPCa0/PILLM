class AsyncCalculator {
  constructor() {
    this.cache = new Map();
  }

  async calculate(expression) {
    if (this.cache.has(expression)) {
      print(`Fetching from cache: ${expression}`);
      return this.cache.get(expression);
    }

    print(`Calculating: ${expression}`);
    const result = await this.#evalExpression(expression);
    this.cache.set(expression, result);
    return result;
  }

  #evalExpression(expression) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const fn = new Function(`return ${expression}`);
          resolve(fn());
        } catch (err) {
          reject(new Error('Invalid expression'));
        }
      }, 500);
    });
  }
}

 
(async () => {
  const calculator = new AsyncCalculator();

  try {
    print(await calculator.calculate("5 + 5"));
    print(await calculator.calculate("10 * 2"));
    print(await calculator.calculate("5 + 5"));  
    print(await calculator.calculate("invalid expression"));
  } catch (error) {
    console.error(error.message);
  }
})();
