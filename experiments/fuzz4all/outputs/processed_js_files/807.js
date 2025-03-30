class AsyncCalculator {
  constructor(initialValue = 0) {
    this.value = initialValue;
  }

  async add(value) {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.value += value;
        print(`Added ${value}, current value: ${this.value}`);
        resolve(this);
      }, 1000);
    });
  }

  async subtract(value) {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.value -= value;
        print(`Subtracted ${value}, current value: ${this.value}`);
        resolve(this);
      }, 1000);
    });
  }

  async multiply(value) {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.value *= value;
        print(`Multiplied by ${value}, current value: ${this.value}`);
        resolve(this);
      }, 1000);
    });
  }

  async divide(value) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (value === 0) {
          reject(new Error("Cannot divide by zero"));
        } else {
          this.value /= value;
          print(`Divided by ${value}, current value: ${this.value}`);
          resolve(this);
        }
      }, 1000);
    });
  }

  get result() {
    return this.value;
  }
}

(async () => {
  try {
    const calculator = new AsyncCalculator(10);
    await calculator.add(5).then(c => c.multiply(2)).then(c => c.subtract(4)).then(c => c.divide(3));
    print(`Final result: ${calculator.result}`);
  } catch (error) {
    console.error(error);
  }
})();
