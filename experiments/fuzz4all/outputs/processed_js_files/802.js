class Complex {
  constructor(real, imaginary) {
    this.real = real;
    this.imaginary = imaginary;
  }

  static fromPolar(magnitude, angle) {
    return new Complex(
      magnitude * Math.cos(angle),
      magnitude * Math.sin(angle)
    );
  }

  add({ real, imaginary }) {
    return new Complex(this.real + real, this.imaginary + imaginary);
  }

  multiply({ real, imaginary }) {
    return new Complex(
      this.real * real - this.imaginary * imaginary,
      this.real * imaginary + this.imaginary * real
    );
  }

  toString() {
    const sign = this.imaginary >= 0 ? "+" : "-";
    return `${this.real} ${sign} ${Math.abs(this.imaginary)}i`;
  }
}

function* complexGenerator(n) {
  let i = 0;
  while (i < n) {
    yield Complex.fromPolar(Math.random() * 10, Math.random() * 2 * Math.PI);
    i++;
  }
}

(async function main() {
  const complexNumbers = Array.from(complexGenerator(5));
  print("Generated Complex Numbers:");
  complexNumbers.forEach((num) => print(num.toString()));

  const sum = complexNumbers.reduce((acc, num) => acc.add(num), new Complex(0, 0));
  print("\nSum:", sum.toString());

  const product = await complexNumbers.reduce(async (accProm, num) => {
    const acc = await accProm;
    return acc.multiply(num);
  }, Promise.resolve(new Complex(1, 0)));

  print("\nProduct:", product.toString());
})();
