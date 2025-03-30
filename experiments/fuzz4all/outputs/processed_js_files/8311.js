class AsyncCalculator {
  #result = 0;
  
  constructor(initialValue = 0) {
    this.#result = initialValue;
  }
  
  async add(value) {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.#result += value;
        resolve(this.#result);
      }, 1000);
    });
  }

  async subtract(value) {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.#result -= value;
        resolve(this.#result);
      }, 1000);
    });
  }

  async multiply(value) {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.#result *= value;
        resolve(this.#result);
      }, 1000);
    });
  }

  async divide(value) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (value === 0) {
          reject(new Error("Cannot divide by zero"));
        } else {
          this.#result /= value;
          resolve(this.#result);
        }
      }, 1000);
    });
  }

  async #operateSequence(operations) {
    for (const { method, value } of operations) {
      await this[method](value).catch(err => console.error(err.message));
    }
    return this.#result;
  }

  performComplexCalculation(operations) {
    return this.#operateSequence(operations);
  }
}

 
(async () => {
  const calculator = new AsyncCalculator(10);
  const operations = [
    { method: 'add', value: 5 },
    { method: 'multiply', value: 2 },
    { method: 'subtract', value: 4 },
    { method: 'divide', value: 3 }
  ];
  
  const result = await calculator.performComplexCalculation(operations);
  print(`Final result: ${result}`);
})();
