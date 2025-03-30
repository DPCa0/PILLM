class Calculator {
  #history = [];

  constructor() {
    this.result = 0;
  }

  static #logOperation(operation, a, b, result) {
    print(`${a} ${operation} ${b} = ${result}`);
  }

  add(a, b) {
    this.result = a + b;
    this.#recordHistory('add', a, b);
    Calculator.#logOperation('+', a, b, this.result);
    return this;
  }

  subtract(a, b) {
    this.result = a - b;
    this.#recordHistory('subtract', a, b);
    Calculator.#logOperation('-', a, b, this.result);
    return this;
  }

  multiply(a, b) {
    this.result = a * b;
    this.#recordHistory('multiply', a, b);
    Calculator.#logOperation('*', a, b, this.result);
    return this;
  }

  divide(a, b) {
    if (b === 0) throw new Error("Cannot divide by zero.");
    this.result = a / b;
    this.#recordHistory('divide', a, b);
    Calculator.#logOperation('/', a, b, this.result);
    return this;
  }

  #recordHistory(operation, a, b) {
    this.#history.push({ operation, operands: [a, b], result: this.result });
  }

  getHistory() {
    return this.#history.map(({ operation, operands, result }) =>
      `${operation}(${operands.join(', ')}) = ${result}`
    ).join('\n');
  }

  static chainOperations(...operations) {
    return operations.reduce((promise, [method, a, b]) => {
      return promise.then(calculator => calculator[method](a, b));
    }, Promise.resolve(new Calculator()));
  }
}

 
(async () => {
  const calc = await Calculator.chainOperations(
    ['add', 5, 3],
    ['multiply', 2, 2],
    ['subtract', 8, 1],
    ['divide', 16, 2]
  );
  print("Final Result:", calc.result);
  print("History:");
  print(calc.getHistory());
})();
