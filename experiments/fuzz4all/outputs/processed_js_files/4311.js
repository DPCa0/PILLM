class ComplexNumber {
  constructor(real, imaginary) {
    this.real = real;
    this.imaginary = imaginary;
  }

   
  *powers() {
    let power = new ComplexNumber(1, 0);
    while (true) {
      yield power;
      power = power.multiply(this);
    }
  }

  multiply(other) {
    const real = this.real * other.real - this.imaginary * other.imaginary;
    const imaginary = this.real * other.imaginary + this.imaginary * other.real;
    return new ComplexNumber(real, imaginary);
  }

  toString() {
    return `${this.real} + ${this.imaginary}i`;
  }

  static parse(str) {
    const [real, imaginary] = str.split('+').map(part => parseFloat(part));
    return new ComplexNumber(real, imaginary);
  }
}

const complex = new ComplexNumber(1, 1);
const powerIterator = complex.powers();
print([...Array(5)].map(() => powerIterator.next().value.toString()));

 
async function calculateAsyncPower(complexNumber, n) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let result = new ComplexNumber(1, 0);
      for (let i = 0; i < n; i++) {
        result = result.multiply(complexNumber);
      }
      resolve(result);
    }, 1000);
  });
}

(async () => {
  const result = await calculateAsyncPower(complex, 3);
  print(`3rd power of complex number: ${result}`);
})();

 
const handler = {
  set(target, property, value) {
    print(`Setting value '${value}' to '${property}'`);
    target[property] = value;
    return true;
  }
};

const proxiedComplex = new Proxy(new ComplexNumber(2, 3), handler);
proxiedComplex.real = 4;
proxiedComplex.imaginary = 5;
