class Calculator {
  constructor() {
    this.history = [];
  }

  operate(operation, ...nums) {
    const operations = {
      add: (...args) => args.reduce((a, b) => a + b, 0),
      subtract: (...args) => args.reduce((a, b) => a - b),
      multiply: (...args) => args.reduce((a, b) => a * b, 1),
      divide: (...args) => args.reduce((a, b) => a / b)
    };

    const result = operations[operation]?.(...nums);
    if (result !== undefined) {
      this.history.push({ operation, nums, result });
      return result;
    } else {
      throw new Error(`Unsupported operation: ${operation}`);
    }
  }

  async calculateAsync(operation, ...nums) {
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    await delay(1000);  
    return this.operate(operation, ...nums);
  }

  * historyGenerator() {
    for (const entry of this.history) {
      yield entry;
    }
  }

  static advancedMathFeatures() {
    return {
      squareRoot: (x) => Math.sqrt(x),
      power: (base, exponent) => base ** exponent
    };
  }
}

(async () => {
  const calc = new Calculator();
  print(calc.operate('add', 1, 2, 3));  
  print(await calc.calculateAsync('multiply', 2, 3, 4));  

  const advMath = Calculator.advancedMathFeatures();
  print(advMath.squareRoot(16));  
  print(advMath.power(2, 10));  

  for (const entry of calc.historyGenerator()) {
    print(`Operation: ${entry.operation}, Numbers: ${entry.nums.join(', ')}, Result: ${entry.result}`);
  }
})();
