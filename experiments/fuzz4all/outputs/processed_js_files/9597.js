class Calculator {
  constructor() {
    this.result = 0;
  }
  
  static logOperation(operation, operands, result) {
    print(`Operation: ${operation}, Operands: [${operands.join(', ')}], Result: ${result}`);
  }
  
  add(...numbers) {
    this.result = numbers.reduce((a, b) => a + b, 0);
    Calculator.logOperation('Addition', numbers, this.result);
    return this;
  }
  
  subtract(...numbers) {
    this.result = numbers.reduce((a, b) => a - b);
    Calculator.logOperation('Subtraction', numbers, this.result);
    return this;
  }

  multiply(...numbers) {
    this.result = numbers.reduce((a, b) => a * b, 1);
    Calculator.logOperation('Multiplication', numbers, this.result);
    return this;
  }

  divide(...numbers) {
    this.result = numbers.reduce((a, b) => a / b);
    Calculator.logOperation('Division', numbers, this.result);
    return this;
  }
  
  getResult() {
    return this.result;
  }
}

class AdvancedCalculator extends Calculator {
  power(base, exponent) {
    this.result = Math.pow(base, exponent);
    Calculator.logOperation('Power', [base, exponent], this.result);
    return this;
  }

  factorial(n) {
    if (n < 0) return undefined;
    this.result = n <= 1 ? 1 : n * this.factorial(n - 1).getResult();
    Calculator.logOperation('Factorial', [n], this.result);
    return this;
  }
}

const advCalc = new AdvancedCalculator();
advCalc.add(2, 3, 4).multiply(5).power(2, 3).factorial(5);
print(`Final Result: ${advCalc.getResult()}`);
