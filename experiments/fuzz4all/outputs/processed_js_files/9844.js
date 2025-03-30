 
class AdvancedCalculator {
  #memory = 0;

  constructor(initialValue = 0) {
    this.#memory = initialValue;
  }

  add(value) {
    this.#memory += value;
    return this;
  }

  subtract(value) {
    this.#memory -= value;
    return this;
  }

  multiply(value) {
    this.#memory *= value;
    return this;
  }

  divide(value) {
    if (value !== 0) {
      this.#memory /= value;
    } else {
      throw new Error("Division by zero is not allowed.");
    }
    return this;
  }

  get result() {
    return this.#memory;
  }

  static fromArray(operations) {
    return operations.reduce((calc, operation) => {
      const [op, value] = operation.split(':');
      switch (op) {
        case 'add':
          return calc.add(Number(value));
        case 'subtract':
          return calc.subtract(Number(value));
        case 'multiply':
          return calc.multiply(Number(value));
        case 'divide':
          return calc.divide(Number(value));
        default:
          return calc;
      }
    }, new AdvancedCalculator());
  }
}

 
async function performCalculations(operations) {
  try {
    const results = await Promise.all(
      operations.map((ops) => 
        new Promise((resolve) => 
          setTimeout(() => resolve(AdvancedCalculator.fromArray(ops)), Math.random() * 1000)
        )
      )
    );

    results.forEach((calc, index) => {
      print(`Result of operation set ${index + 1}: ${calc.result}`);
    });
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

const operationSets = [
  ['add:10', 'multiply:2', 'subtract:5', 'divide:3'],
  ['add:20', 'divide:2', 'multiply:4'],
  ['subtract:5', 'add:15', 'multiply:2', 'divide:4']
];

performCalculations(operationSets);
