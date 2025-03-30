 
class ComplexNumber {
  #real;
  #imaginary;

  constructor(real, imaginary) {
    this.#real = real;
    this.#imaginary = imaginary;
  }

   
  static random() {
    return new ComplexNumber(Math.random() * 10, Math.random() * 10);
  }

   
  #format() {
    return `${this.#real} + ${this.#imaginary}i`;
  }

   
  add(other) {
    return new ComplexNumber(this.#real + other.#real, this.#imaginary + other.#imaginary);
  }

   
  toString() {
    return this.#format();
  }
}

 
const [num1, num2, ...rest] = [
  new ComplexNumber(1, 2),
  ComplexNumber.random(),
  new ComplexNumber(3, 4)
];

 
async function* fetchComplexNumbers() {
  for (const complex of [num1, num2, ...rest]) {
    await new Promise(resolve => setTimeout(resolve, 500));
    yield complex;
  }
}

 
(async () => {
  for await (const complex of fetchComplexNumbers()) {
    print(`Fetched complex number: ${complex.toString()}`);
  }
})();
