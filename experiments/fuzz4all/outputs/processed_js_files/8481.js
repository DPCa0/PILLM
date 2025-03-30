class ComplexNumber {
  constructor(real, imaginary) {
    this.real = real;
    this.imaginary = imaginary;
  }

   
  *[Symbol.iterator]() {
    yield this.real;
    yield this.imaginary;
  }

   
  static add(...complexNumbers) {
    return complexNumbers.reduce((acc, curr) => 
      new ComplexNumber(acc.real + curr.real, acc.imaginary + curr.imaginary), new ComplexNumber(0, 0));
  }

   
  get magnitude() {
    return Math.sqrt(this.real ** 2 + this.imaginary ** 2);
  }

   
  async *fetchOperations() {
    yield await new Promise(resolve => setTimeout(() => resolve(`Addition: ${this.real} + ${this.imaginary}i`), 500));
    yield await new Promise(resolve => setTimeout(() => resolve(`Magnitude: ${this.magnitude}`), 500));
  }

   
  static createLoggingProxy(target) {
    return new Proxy(target, {
      get(obj, prop) {
        const origMethod = obj[prop];
        if (typeof origMethod === 'function') {
          return function (...args) {
            print(`Called ${prop} with ${args}`);
            return origMethod.apply(this, args);
          }
        }
        return origMethod;
      }
    });
  }
}

const complexNumbers = [
  new ComplexNumber(3, 4),
  new ComplexNumber(1, 2),
  new ComplexNumber(5, -1)
];

const loggedComplexNumber = ComplexNumber.createLoggingProxy(ComplexNumber);
const sum = loggedComplexNumber.add(...complexNumbers);

print(`Sum: ${sum.real} + ${sum.imaginary}i`);

 
(async () => {
  for await (let operation of sum.fetchOperations()) {
    print(operation);
  }
})();
