class AdvancedCalculator {
  #result = 0;

  constructor() {
    this.operations = [];
  }

  static logger = (msg) => print(`[Log]: ${msg}`);

  add(...values) {
    this.#result += values.reduce((acc, val) => acc + val, 0);
    this.operations.push(`add(${values.join(', ')})`);
    return this;
  }

  multiply(...values) {
    this.#result = values.reduce((acc, val) => acc * val, this.#result || 1);
    this.operations.push(`multiply(${values.join(', ')})`);
    return this;
  }

  getResult() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.#result);
      }, 1000);
    });
  }

  async calculate() {
    try {
      AdvancedCalculator.logger('Calculation started');
      const result = await this.getResult();
      AdvancedCalculator.logger(`Operations: ${this.operations.join(' -> ')}`);
      AdvancedCalculator.logger(`Final Result: ${result}`);
    } catch (error) {
      AdvancedCalculator.logger(`Error: ${error}`);
    }
  }
}

(async () => {
  const calculator = new AdvancedCalculator();
  await calculator.add(2, 3).multiply(4).add(5).calculate();
})();
