class ComplexNumber {
  constructor(real, imaginary) {
    this.real = real;
    this.imaginary = imaginary;
  }

  add({ real, imaginary }) {
    return new ComplexNumber(this.real + real, this.imaginary + imaginary);
  }

  multiply({ real, imaginary }) {
    return new ComplexNumber(
      this.real * real - this.imaginary * imaginary,
      this.real * imaginary + this.imaginary * real
    );
  }

  static fromPolar(magnitude, angle) {
    return new ComplexNumber(
      magnitude * Math.cos(angle),
      magnitude * Math.sin(angle)
    );
  }

  toString() {
    return `${this.real} ${this.imaginary < 0 ? '-' : '+'} ${Math.abs(
      this.imaginary
    )}i`;
  }
}

 
const handler = {
  get(target, prop, receiver) {
    if (typeof prop === 'string' && /^c(\d+)$/.test(prop)) {
      return target[prop] || (target[prop] = new ComplexNumber(Number(prop), 0));
    }
    return Reflect.get(...arguments);
  },
  apply(target, thisArg, argumentsList) {
    print(`Invoking: ${target.name}`);
    return target.apply(thisArg, argumentsList);
  },
};

const complexOps = new Proxy(
  {
     
    *range(start, end, step = 1) {
      let current = start;
      while (current <= end) {
        yield new ComplexNumber(current, current);
        current += step;
      }
    },
  },
  handler
);

 
const CustomOps = {
  [Symbol.hasInstance](instance) {
    return instance instanceof ComplexNumber && instance.real > 0;
  },
};

 
const c1 = new ComplexNumber(2, 3);
const c2 = new ComplexNumber(4, -1);

const sum = c1.add(c2);
const product = c1.multiply(c2);
const polar = ComplexNumber.fromPolar(5, Math.PI / 4);

print(`Sum: ${sum.toString()}`);
print(`Product: ${product.toString()}`);
print(`Polar: ${polar.toString()}`);
console.log(`Is c1 instance of positive ComplexNumber? ${c1