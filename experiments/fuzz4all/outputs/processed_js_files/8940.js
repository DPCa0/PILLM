class ComplexNumber {
  constructor(real, imaginary) {
    this.real = real;
    this.imaginary = imaginary;
  }

  add({ real, imaginary }) {
    return new ComplexNumber(this.real + real, this.imaginary + imaginary);
  }

  multiply({ real, imaginary }) {
    const realPart = this.real * real - this.imaginary * imaginary;
    const imaginaryPart = this.real * imaginary + this.imaginary * real;
    return new ComplexNumber(realPart, imaginaryPart);
  }

  toString() {
    return `${this.real} ${this.imaginary < 0 ? '-' : '+'} ${Math.abs(this.imaginary)}i`;
  }

  static fromArray([real, imaginary]) {
    return new ComplexNumber(real, imaginary);
  }

  static async fetchComplexNumber() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(new ComplexNumber(1, 2));
      }, 1000);
    });
  }
}

(async () => {
  const num1 = ComplexNumber.fromArray([3, 4]);
  const num2 = await ComplexNumber.fetchComplexNumber();

  const sum = num1.add(num2);
  const product = num1.multiply(num2);

  print(`First Complex Number: ${num1}`);
  print(`Second Complex Number (Fetched): ${num2}`);
  print(`Sum: ${sum}`);
  print(`Product: ${product}`);
})();
