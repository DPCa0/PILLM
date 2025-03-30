class AdvancedCalculator {
  #history = [];

  constructor() {
    this.historyLimit = 5;
  }

  executeOperation(operation, ...args) {
    if (typeof this[operation] === 'function') {
      const result = this[operation](...args);
      this.#addToHistory(operation, args, result);
      return result;
    }
    throw new Error(`Operation ${operation} not supported.`);
  }

  #addToHistory(operation, args, result) {
    this.#history.push({ operation, args, result });
    if (this.#history.length > this.historyLimit) {
      this.#history.shift();
    }
  }

  get history() {
    return [...this.#history];
  }

   
  add(a, b) {
    return a + b;
  }

  subtract(a, b) {
    return a - b;
  }

  multiply(a, b) {
    return a * b;
  }

  divide(a, b) {
    return b !== 0 ? a / b : NaN;
  }

   
  static create() {
    const instance = new AdvancedCalculator();
    return new Proxy(instance, {
      get(target, prop, receiver) {
        if (prop in target) {
          return Reflect.get(target, prop, receiver);
        }
        throw new ReferenceError(`Property ${prop} doesn't exist.`);
      },
      set(target, prop, value) {
        if (prop === 'historyLimit' && (typeof value !== 'number' || value <= 0)) {
          throw new TypeError('History limit must be a positive number.');
        }
        target[prop] = value;
        return true;
      }
    });
  }
}

// Usage
try {
  const calculator = AdvancedCalculator.create();
  print(calculator.executeOperation('add', 5, 3)); // 8
  print(calculator.executeOperation('multiply', 4, 7)); // 28
  calculator.historyLimit = 3;
  print(calculator.history);

  // Triggering errors
  // print(calculator.executeOperation('unknownOp', 1, 2));
   
   
} catch (error) {
  console.error(error.message);
}
