class AsyncCalculator {
  constructor() {
    this.operations = [];
  }

  addOperation(operation) {
    this.operations.push(operation);
  }

  async execute() {
    const results = await Promise.all(
      this.operations.map(async (operation) => {
        const { op, args } = operation;
        return this[op](...args);
      })
    );
    return results;
  }

  async add(a, b) {
    await this.delay(100);
    return a + b;
  }

  async subtract(a, b) {
    await this.delay(100);
    return a - b;
  }

  async multiply(a, b) {
    await this.delay(100);
    return a * b;
  }

  async divide(a, b) {
    await this.delay(100);
    if (b === 0) throw new Error("Division by zero");
    return a / b;
  }

  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

(async () => {
  const calculator = new AsyncCalculator();

  calculator.addOperation({ op: 'add', args: [5, 3] });
  calculator.addOperation({ op: 'subtract', args: [10, 2] });
  calculator.addOperation({ op: 'multiply', args: [4, 3] });
  calculator.addOperation({ op: 'divide', args: [20, 5] });

  try {
    const results = await calculator.execute();
    print('Results:', results);
  } catch (error) {
    console.error('Error:', error);
  }
})();
