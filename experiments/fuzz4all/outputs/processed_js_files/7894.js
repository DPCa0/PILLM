 
class ComplexNumber {
  #real;
  #imaginary;

  constructor(real, imaginary) {
    this.#real = real;
    this.#imaginary = imaginary;
  }

   
  #conjugate() {
    return new ComplexNumber(this.#real, -this.#imaginary);
  }

   
  magnitude() {
    const conjugate = this.#conjugate();
    return Math.sqrt(this.#real * conjugate.#real + this.#imaginary * conjugate.#imaginary);
  }

   
  *getComponents() {
    yield this.#real;
    yield this.#imaginary;
  }

   
  static parse(str) {
    const [real, imaginary] = str.match(/-?\d+/g) ?? [];
    return new ComplexNumber(parseFloat(real) ?? 0, parseFloat(imaginary) ?? 0);
  }
}

 
const myComplex = new ComplexNumber(3, 4);
const [realPart, imaginaryPart] = [...myComplex.getComponents()];
print(`Real: ${realPart}, Imaginary: ${imaginaryPart}`);
print(`Magnitude: ${myComplex.magnitude()}`);

 
const parsedComplex = ComplexNumber.parse("5 + 6i");
print(`Parsed Complex Number: Real: ${parsedComplex.#real}, Imaginary: ${parsedComplex.#imaginary}`);
