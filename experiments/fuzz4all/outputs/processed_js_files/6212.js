class Calculator {
  #history = [];

  static #validateInput(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error('Invalid input: arguments must be numbers');
    }
  }

  constructor(name = 'Advanced Calculator') {
    this.name = name;
  }

  add(a, b) {
    Calculator.#validateInput(a, b);
    const result = a + b;
    this.#logHistory('add', a, b, result);
    return result;
  }

  subtract(a, b) {
    Calculator.#validateInput(a, b);
    const result = a - b;
    this.#logHistory('subtract', a, b, result);
    return result;
  }

  multiply(a, b) {
    Calculator.#validateInput(a, b);
    const result = a * b;
    this.#logHistory('multiply', a, b, result);
    return result;
  }

  divide(a, b) {
    Calculator.#validateInput(a, b);
    if (b === 0) throw new Error('Division by zero is not allowed');
    const result = a / b;
    this.#logHistory('divide', a, b, result);
    return result;
  }

  #logHistory(operation, a, b, result) {
    const entry = { operation, a, b, result, timestamp: new Date().toISOString() };
    this.#history.push(entry);
  }

  getHistory() {
    return this.#history;
  }

  static #mergeHistories(histories) {
    return histories.flat().sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  }

  static mergeCalculators(...calculators) {
    const histories = calculators.map(calc => calc.getHistory());
    return Calculator.#mergeHistories(histories);
  }
}

 
const handler = {
  get: (target, prop) => {
    if (typeof target[prop] !== 'function') {
      throw new Error(`Property ${prop} is not a function`);
    }
    return target[prop];
  }
};

const advCalc = new Proxy(new Calculator(), handler);

try {
  print(advCalc.add(10, 5));          
  print(advCalc.subtract(10, 5));     
  print(advCalc.multiply(10, 5));