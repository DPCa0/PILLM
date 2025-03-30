class Calculator {
  #history = [];
  
  static #logCalculation = (operation, a, b, result) => {
    print(`Operation: ${operation} | ${a} ${operation} ${b} = ${result}`);
  }

  add(a, b) {
    const result = a + b;
    Calculator.#logCalculation('+', a, b, result);
    this.#history.push({ operation: 'add', operands: [a, b], result });
    return result;
  }

  subtract(a, b) {
    const result = a - b;
    Calculator.#logCalculation('-', a, b, result);
    this.#history.push({ operation: 'subtract', operands: [a, b], result });
    return result;
  }

  multiply(a, b) {
    const result = a * b;
    Calculator.#logCalculation('*', a, b, result);
    this.#history.push({ operation: 'multiply', operands: [a, b], result });
    return result;
  }

  divide(a, b) {
    if (b === 0) throw new Error("Division by zero is not allowed.");
    const result = a / b;
    Calculator.#logCalculation('/', a, b, result);
    this.#history.push({ operation: 'divide', operands: [a, b], result });
    return result;
  }

  get history() {
    return [...this.#history];
  }

  clearHistory() {
    this.#history.length = 0;
  }

  static async computeWithDelay(a, b, operation, delay = 1000) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const calculator = new Calculator();
        let result;
        switch (operation) {
          case 'add':
            result = calculator.add(a, b);
            break;
          case 'subtract':
            result = calculator.subtract(a, b);
            break;
          case 'multiply':
            result = calculator.multiply(a, b);
            break;
          case 'divide':
            result = calculator.divide(a, b);
            break;
          default:
            throw new Error(`Unsupported operation: ${operation}`);
        }
        resolve(result);
      }, delay);
    });
  }
}

 
(async () => {
  const calc = new Calculator();
  print(calc.add(10, 5));
  print(calc.subtract(10, 5));
  print(calc.multiply(10, 5));