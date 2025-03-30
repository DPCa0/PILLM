class ComplexNumber {
  #real;
  #imaginary;
  
  constructor(real, imaginary) {
    this.#real = real;
    this.#imaginary = imaginary;
  }
  
  get real() {
    return this.#real;
  }
  
  get imaginary() {
    return this.#imaginary;
  }
  
  static fromString(complexStr) {
    const [real, imaginary] = complexStr.match(/-?\d+/g).map(Number);
    return new ComplexNumber(real, imaginary);
  }

  [Symbol.toPrimitive](hint) {
    if (hint === 'string') {
      return `${this.#real} + ${this.#imaginary}i`;
    }
    return NaN;
  }

  add(other) {
    return new ComplexNumber(this.#real + other.real, this.#imaginary + other.imaginary);
  }

  multiply(other) {
    const real = this.#real * other.real - this.#imaginary * other.imaginary;
    const imaginary = this.#real * other.imaginary + this.#imaginary * other.real;
    return new ComplexNumber(real, imaginary);
  }
  
  *[Symbol.iterator]() {
    yield this.#real;
    yield this.#imaginary;
  }
}

 
(async () => {
  const c1 = ComplexNumber.fromString("3 + 4i");
  const c2 = new ComplexNumber(1, -2);

  print(`c1: ${String(c1)}`);
  print(`c2: ${String(c2)}`);
  
  const sum = c1.add(c2);
  print(`Sum: ${String(sum)}`);
  
  const product = c1.multiply(c2);
  print(`Product: ${String(product)}`);

   
  for (const part of sum) {
    print(part);
  }

   
  const calculateAsync = () => new Promise(resolve => {
    setTimeout(() => resolve(c1.multiply(c2)), 1000);
  });

  const result = await calculateAsync();
  print(`Async Product: ${String(result)}`);
})();
