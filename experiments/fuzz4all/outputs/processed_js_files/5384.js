 
class ComplexCalculator {
  #history = [];

  static fromJSON(json) {
    const data = JSON.parse(json);
    const calculator = new ComplexCalculator();
    calculator.#history = data.history;
    return calculator;
  }

  add(a, b) {
    const result = a + b;
    this.#history.push({ operation: 'add', operands: [a, b], result });
    return result;
  }

  multiply(a, b) {
    const result = a * b;
    this.#history.push({ operation: 'multiply', operands: [a, b], result });
    return result;
  }

  getHistory() {
    return [...this.#history];
  }

  async calculateAsync(func, ...args) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = func(...args);
        resolve(result);
      }, 1000);
    });
  }
}

 
const logger = {
  get(target, property) {
    if (typeof target[property] === 'function') {
      return (...args) => {
        print(`Called ${property} with arguments: ${JSON.stringify(args)}`);
        return target[property](...args);
      };
    }
    return target[property];
  },
};

 
const calculator = new Proxy(new ComplexCalculator(), logger);

 
(async () => {
  print(await calculator.calculateAsync(calculator.add.bind(calculator), 2, 3));
  print(await calculator.calculateAsync(calculator.multiply.bind(calculator), 4, 5));

   
  const serializedCalculator = JSON.stringify({ history: calculator.getHistory() });
  const deserializedCalculator = ComplexCalculator.fromJSON(serializedCalculator);
  print(deserializedCalculator.getHistory());
})();
