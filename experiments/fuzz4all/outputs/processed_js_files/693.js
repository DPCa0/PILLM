class ComplexNumber {
  constructor(real, imaginary) {
    this.real = real;
    this.imaginary = imaginary;
  }
  
  add({ real, imaginary }) {
    return new ComplexNumber(this.real + real, this.imaginary + imaginary);
  }
  
  multiply({ real, imaginary }) {
    return new ComplexNumber(
      this.real * real - this.imaginary * imaginary,
      this.real * imaginary + this.imaginary * real
    );
  }
  
  toString() {
    const sign = this.imaginary >= 0 ? '+' : '-';
    return `${this.real} ${sign} ${Math.abs(this.imaginary)}i`;
  }
}

const asyncOperation = async (value) => {
  return new Promise(resolve => setTimeout(() => resolve(value), 1000));
};

(async () => {
  const num1 = new ComplexNumber(2, 3);
  const num2 = new ComplexNumber(1, -4);

  print(`Adding: ${num1.add(num2).toString()}`);
  print(`Multiplying: ${num1.multiply(num2).toString()}`);

  const result = await asyncOperation(num1.add(num2));
  print(`Result after async operation: ${result.toString()}`);
})();
