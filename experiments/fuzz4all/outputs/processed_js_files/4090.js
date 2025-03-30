class ComplexCalculator {
  #history = [];

  constructor(initialValue = 0) {
    this.value = initialValue;
  }

  add(number) {
    this.value += number;
    this.#history.push(`Added ${number}`);
    return this;
  }

  subtract(number) {
    this.value -= number;
    this.#history.push(`Subtracted ${number}`);
    return this;
  }

  multiply(number) {
    this.value *= number;
    this.#history.push(`Multiplied by ${number}`);
    return this;
  }

  divide(number) {
    if (number === 0) throw new Error("Division by zero");
    this.value /= number;
    this.#history.push(`Divided by ${number}`);
    return this;
  }

  get result() {
    return this.value;
  }

  static async complexOperation(calc, steps) {
    for (let step of steps) {
      calc = await new Promise(resolve =>
        setTimeout(() => {
          switch (step.operation) {
            case 'add':
              resolve(calc.add(step.value));
              break;
            case 'subtract':
              resolve(calc.subtract(step.value));
              break;
            case 'multiply':
              resolve(calc.multiply(step.value));
              break;
            case 'divide':
              resolve(calc.divide(step.value));
              break;
            default:
              resolve(calc);
          }
        }, 100)
      );
    }
    return calc;
  }

  get history() {
    return [...this.#history];
  }
}

 
(async () => {
  const calc = new ComplexCalculator(10);
  const steps = [
    { operation: 'add', value: 5 },
    { operation: 'multiply', value: 3 },
    { operation: 'subtract', value: 2 },
    { operation: 'divide', value: 4 },
  ];

  await ComplexCalculator.complexOperation(calc, steps);
  print('Result:', calc.result);  
  print('History:', calc.history);
})();
