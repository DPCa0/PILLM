class ComplexNumber {
  constructor(real, imaginary) {
    this.real = real;
    this.imaginary = imaginary;
  }

  static fromString(str) {
    const match = str.match(/([-+]?\d*\.?\d+)?([-+]\d*\.?\d+)i/);
    if (!match) throw new Error("Invalid format");
    return new ComplexNumber(
      parseFloat(match[1] || 0),
      parseFloat(match[2])
    );
  }

  [Symbol.toPrimitive](hint) {
    switch (hint) {
      case 'string':
        return `${this.real}${this.imaginary >= 0 ? '+' : ''}${this.imaginary}i`;
      case 'number':
        return this.real;
      default:
        return this;
    }
  }

  *[Symbol.iterator]() {
    yield this.real;
    yield this.imaginary;
  }

  async divide(other) {
    const conjugate = new ComplexNumber(other.real, -other.imaginary);
    const numerator = this.multiply(conjugate);
    const denominator = other.multiply(conjugate);
    return new ComplexNumber(
      numerator.real / denominator.real,
      numerator.imaginary / denominator.real
    );
  }

  multiply({ real, imaginary }) {
    return new ComplexNumber(
      this.real * real - this.imaginary * imaginary,
      this.real * imaginary + this.imaginary * real
    );
  }
}

(async () => {
  const complex = new ComplexNumber(3, 4);
  const fromString = ComplexNumber.fromString("2+5i");
  const [real, imag] = fromString;
  const divided = await complex.divide(fromString);

  print(`Complex number: ${String(complex)}`);
  print(`From string: ${String(fromString)}`);
  print(`Real part: ${real}, Imaginary part: ${imag}`);
  print(`Division result: ${String(divided)}`);
})();
