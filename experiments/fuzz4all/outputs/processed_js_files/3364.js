class ComplexCalculator {
  constructor(initValue = 0) {
    this.value = initValue;
  }

  add(value) {
    this.value += value;
    return this;  
  }

  multiply(value) {
    this.value *= value;
    return this;  
  }

  power(exponent) {
    this.value = Math.pow(this.value, exponent);
    return this;  
  }

  async fetchFactorialAsync(n) {
    if (n < 0) throw new Error("Negative numbers are not allowed!");
    this.value = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.calculateFactorial(n));
      }, 1000);
    });
    return this;  
  }

  calculateFactorial(n) {
    return n <= 1 ? 1 : n * this.calculateFactorial(n - 1);
  }
}

(async () => {
   
  const calculator = new ComplexCalculator(2);
  await calculator.add(5)
    .multiply(3)
    .power(2)
    .fetchFactorialAsync(5);

  print(calculator.value);  
})();
