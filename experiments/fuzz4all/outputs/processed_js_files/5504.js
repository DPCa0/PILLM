 
const uniqueId = (() => {
  const symbolMap = new WeakMap();
  return (obj) => {
    if (!symbolMap.has(obj)) {
      symbolMap.set(obj, Symbol());
    }
    return symbolMap.get(obj);
  };
})();

 
const stateHandler = {
  get(target, prop) {
    print(`Accessing property: ${prop}`);
    return prop in target ? target[prop] : `Property ${prop} not found.`;
  },
  set(target, prop, value) {
    if (typeof value === 'number') {
      print(`Setting ${prop} to ${value}`);
      target[prop] = value;
      return true;
    }
    throw new TypeError('Values must be numbers');
  },
};

 
class Complex {
  #real;
  #imaginary;
  static #count = 0;

  constructor(real, imaginary) {
    this.#real = real;
    this.#imaginary = imaginary;
    this[uniqueId(this)] = new Proxy(this, stateHandler);
    Complex.#count++;
  }

  static get count() {
    return this.#count;
  }

  get real() {
    return this.#real;
  }

  get imaginary() {
    return this.#imaginary;
  }

  set real(value) {
    if (typeof value !== 'number') throw new TypeError('Real part must be a number');
    this.#real = value;
  }

  set imaginary(value) {
    if (typeof value !== 'number') throw new TypeError('Imaginary part must be a number');
    this.#imaginary = value;
  }

  add({ real, imaginary }) {
    return new Complex(this.#real + real, this.#imaginary + imaginary);
  }

  [Symbol.iterator]() {
    let index = 0;
    const values = [this.#real, this.#imaginary];
    return {
      next: () => ({
        value: values[index],
        done: index++ >= values.length,
      }),
    };
  }

  toString() {
    return `${this.#real} + ${this.#imaginary}i`;
  }
}

 
const complex1 = new Complex(2, 3);
const complex2 = new Complex(3, 4);
print(`Complex instances created: ${Complex.count}`);
const result = complex1.add