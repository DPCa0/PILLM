 
class AdvancedCalculator {
  #secretMultiplier;
  #history;

  constructor() {
    this.#secretMultiplier = 1.618;  
    this.#history = [];
  }

   
  #logCalculation(operation, result) {
    this.#history.push({ operation, result, timestamp: new Date() });
  }

   
  performComplexCalculation(a, b) {
    const complexResult = (a ** 2 + b ** 2) * this.#secretMultiplier;
    this.#logCalculation(`Complex calc: (${a}^2 + ${b}^2) * φ`, complexResult);
    return complexResult;
  }

   
  static createMultiplier(multiplier) {
    return function(n) {
      return n * multiplier;
    };
  }

   
  *getHistory() {
    for (const entry of this.#history) {
      yield entry;
    }
  }
}

 
const calculator = new AdvancedCalculator();

 
print(calculator.performComplexCalculation(3, 4));
print(calculator.performComplexCalculation(5, 12));

 
const double = AdvancedCalculator.createMultiplier(2);
print(double(10));

 
for (const record of calculator.getHistory()) {
  print(record);
}
