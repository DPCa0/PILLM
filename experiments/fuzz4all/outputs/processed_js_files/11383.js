class FluentCalculator {
  constructor(value = 0) {
    this.value = value;
  }

  add(num) {
    this.value += num;
    return this;
  }

  subtract(num) {
    this.value -= num;
    return this;
  }

  multiply(num) {
    this.value *= num;
    return this;
  }

  divide(num) {
    if (num === 0) throw new Error("Division by zero");
    this.value /= num;
    return this;
  }

  pow(exponent) {
    this.value **= exponent;
    return this;
  }

  get result() {
    return this.value;
  }

  static chainOperations(...operations) {
    return operations.reduce((acc, op) => op(acc), new FluentCalculator());
  }
}

async function calculate() {
  const operations = [
    (calc) => calc.add(10),
    (calc) => calc.multiply(5),
    (calc) => calc.subtract(30),
    (calc) => calc.divide(2),
    (calc) => calc.pow(2),
  ];

   
  const result = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(FluentCalculator.chainOperations(...operations).result);
    }, 1000);
  });

  print("Final result:", result);
}

calculate();
