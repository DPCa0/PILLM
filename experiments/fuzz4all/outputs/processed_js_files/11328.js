class AsyncCalculator {
  constructor(initialValue = 0) {
    this.value = initialValue;
  }

  async add(x) {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.value += x;
        print(`Added ${x}, new value is ${this.value}`);
        resolve(this.value);
      }, 500);
    });
  }

  async multiply(x) {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.value *= x;
        print(`Multiplied by ${x}, new value is ${this.value}`);
        resolve(this.value);
      }, 500);
    });
  }

  async subtract(x) {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.value -= x;
        print(`Subtracted ${x}, new value is ${this.value}`);
        resolve(this.value);
      }, 500);
    });
  }

  async divide(x) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (x === 0) {
          reject(new Error('Division by zero error.'));
        } else {
          this.value /= x;
          print(`Divided by ${x}, new value is ${this.value}`);
          resolve(this.value);
        }
      }, 500);
    });
  }

  async calculate(operations) {
    for (let operation of operations) {
      const [method, value] = operation;
      if (this[method]) {
        try {
          await this[method](value);
        } catch (error) {
          console.error(error.message);
        }
      } else {
        console.warn(`No method named ${method}`);
      }
    }
    return this.value;
  }
}

(async () => {
  const calculator = new AsyncCalculator();
  await calculator.calculate([
    ['add', 5],
    ['multiply', 2],
    ['subtract', 3],
    ['divide', 0],  
    ['divide', 4],
  ]);
})();
