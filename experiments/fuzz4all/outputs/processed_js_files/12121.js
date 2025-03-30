 
class ComplexNumber {
  #real;
  #imaginary;

  constructor(real, imaginary) {
    this.#real = real;
    this.#imaginary = imaginary;
  }

   
  get ['magnitude']() {
    return Math.sqrt(this.#real ** 2 + this.#imaginary ** 2);
  }

   
  static add(c1, c2) {
    return new ComplexNumber(c1.#real + c2.#real, c1.#imaginary + c2.#imaginary);
  }

   
  *polar() {
    yield this.magnitude;
    yield Math.atan2(this.#imaginary, this.#real);
  }

   
  toString() {
    const tag = (strings, ...values) => strings.reduce((str, part, i) => str + part + (values[i] || ''), '');
    return tag`${this.#real} + ${this.#imaginary}i`;
  }
}

 
const c1 = new ComplexNumber(3, 4);
const c2 = new ComplexNumber(1, 2);

 
const c3 = ComplexNumber.add(c1, c2);

print(`c1: ${c1.toString()}, Magnitude: ${c1.magnitude}`);
print(`c2: ${c2.toString()}, Magnitude: ${c2.magnitude}`);
print(`c3: ${c3.toString()}, Magnitude: ${c3.magnitude}`);

 
const [magnitude, angle] = [...c1.polar()];
print(`c1 Polar Coordinates -> Magnitude: ${magnitude}, Angle: ${angle}`);
