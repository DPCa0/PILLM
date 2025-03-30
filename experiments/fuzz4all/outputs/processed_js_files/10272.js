class ComplexNumber {
  constructor(real, imaginary) {
    this.real = real;
    this.imaginary = imaginary;
  }

  *[Symbol.iterator]() {
    yield this.real;
    yield this.imaginary;
  }

  static from([real, imaginary]) {
    return new ComplexNumber(real, imaginary);
  }

  [Symbol.toPrimitive](hint) {
    if (hint === 'number') {
      return Math.hypot(this.real, this.imaginary);
    }
    return `${this.real} + ${this.imaginary}i`;
  }

  async calculateSquare() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const real = this.real * this.real - this.imaginary * this.imaginary;
        const imaginary = 2 * this.real * this.imaginary;
        resolve(new ComplexNumber(real, imaginary));
      }, 1000);
    });
  }
}

(async () => {
  const complex = new ComplexNumber(3, 4);
  print('Complex Number:', `${complex}`);
  
  const magnitude = Number(complex);
  print('Magnitude:', magnitude);

  print('Destructuring:', ...complex);

  const complexArr = [...complex];
  const newComplex = ComplexNumber.from(complexArr);
  print('New Complex:', `${newComplex}`);

  const squaredComplex = await complex.calculateSquare();
  print('Squared Complex:', `${squaredComplex}`);
})();
