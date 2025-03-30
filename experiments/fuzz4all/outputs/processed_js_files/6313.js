class AsyncCalculator {
  constructor(initialValue = 0) {
    this.value = initialValue;
  }

  async add(number) {
    this.value += await this.simulateAsyncOperation(number);
    return this;
  }

  async subtract(number) {
    this.value -= await this.simulateAsyncOperation(number);
    return this;
  }

  async multiply(number) {
    this.value *= await this.simulateAsyncOperation(number);
    return this;
  }

  async divide(number) {
    if (number === 0) throw new Error('Division by zero');
    this.value /= await this.simulateAsyncOperation(number);
    return this;
  }

  simulateAsyncOperation(number) {
    return new Promise((resolve) => setTimeout(() => resolve(number), 100));
  }

  async compute(callback) {
    try {
      await callback(this);
      print(`Final result: ${this.value}`);
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }
}

(async function() {
  const calculator = new AsyncCalculator(10);

  await calculator.compute(async (calc) => {
    await calc.add(5).subtract(3).multiply(4).divide(2);
  });

  await calculator.compute(async (calc) => {
    await calc.divide(0);
  });
})();
