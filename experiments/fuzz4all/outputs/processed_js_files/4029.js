class ComplexNumber {
  constructor(real, imaginary) {
    this.real = real;
    this.imaginary = imaginary;
  }

  add(other) {
    return new ComplexNumber(
      this.real + other.real,
      this.imaginary + other.imaginary
    );
  }

  multiply(other) {
    const realPart = this.real * other.real - this.imaginary * other.imaginary;
    const imaginaryPart =
      this.real * other.imaginary + this.imaginary * other.real;
    return new ComplexNumber(realPart, imaginaryPart);
  }

  toString() {
    return `${this.real} + ${this.imaginary}i`;
  }
}

const asyncComplexAddition = async (a, b) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(a.add(b)), 1000);
  });
};

const main = async () => {
  const num1 = new ComplexNumber(2, 3);
  const num2 = new ComplexNumber(4, 5);

  const result1 = num1.multiply(num2);
  print(`Multiplication: ${result1.toString()}`);

  const result2 = await asyncComplexAddition(num1, num2);
  print(`Async Addition: ${result2.toString()}`);

  const arr = [result1, result2];
  console.log(
    "Complex Numbers Array:",
    arr.map((c) => c.toString())
  );

  const map = new Map(
    arr.map((c, index) => [`Complex Number ${index + 1}`, c.toString()])
  );
  print("Complex Numbers Map:", map);
};

main();
