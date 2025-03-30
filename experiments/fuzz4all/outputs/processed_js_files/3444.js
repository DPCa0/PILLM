class ComplexNumber {
  constructor(real, imaginary) {
    this.real = real;
    this.imaginary = imaginary;
  }

  static fromString(complexStr) {
    const regex = /(-?\d+\.?\d*)?([+-]\d+\.?\d*)i/;
    const [, real = "0", imaginary = "0"] = complexStr.match(regex) || [];
    return new ComplexNumber(parseFloat(real), parseFloat(imaginary));
  }

  [Symbol.toPrimitive](hint) {
    if (hint === 'string') {
      return `${this.real} + ${this.imaginary}i`;
    }
    return NaN;
  }

  *[Symbol.iterator]() {
    yield this.real;
    yield this.imaginary;
  }

  add({ real, imaginary }) {
    return new ComplexNumber(this.real + real, this.imaginary + imaginary);
  }

  multiply({ real, imaginary }) {
    const newReal = this.real * real - this.imaginary * imaginary;
    const newImaginary = this.real * imaginary + this.imaginary * real;
    return new ComplexNumber(newReal, newImaginary);
  }
}

(async () => {
  const a = ComplexNumber.fromString("3+4i");
  const b = ComplexNumber.fromString("1-2i");

  const sum = a.add(b);
  const product = a.multiply(b);

  const results = {
    sum: `${sum}`,
    product: `${product}`,
    individual: [...product],
  };

  const delayedOutput = (result) => new Promise((resolve) => {
    setTimeout(() => resolve(result), 1000);
  });

  for (const [key, value] of Object.entries(results)) {
    print(`Computing ${key}...`);
    print(await delayedOutput(value));
  }
})();
