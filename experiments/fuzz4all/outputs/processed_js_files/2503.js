 

 
class ComplexCalculator {
  #privateVar;

  constructor(initValue = 0) {
    this.#privateVar = initValue;
  }

  static fromArray(arr) {
    return new ComplexCalculator(arr.reduce((acc, num) => acc + num, 0));
  }

  add(...values) {
    this.#privateVar += values.reduce((acc, num) => acc + num, 0);
    return this;
  }

  multiply(factor) {
    this.#privateVar *= factor;
    return this;
  }

  get result() {
    return this.#privateVar;
  }
}

 
async function performComplexOperations() {
  const calc1 = ComplexCalculator.fromArray([1, 2, 3]);
  const calc2 = new ComplexCalculator(10).add(5, 5).multiply(2);

  const [result1, result2] = await Promise.all([
    Promise.resolve(calc1.add(5).multiply(2).result),
    Promise.resolve(calc2.result),
  ]);

  print({ result1, result2 });
}

 
function highlight(strings, ...values) {
  return strings.reduce((acc, str, i) => {
    return `${acc}${str}<strong>${values[i] || ''}</strong>`;
  }, '');
}

const name = 'John Doe';
const age = 30;
print(highlight`Name: ${name}, Age: ${age}`);

 
performComplexOperations().catch(console.error);
