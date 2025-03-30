 
class ComplexCalculator {
  #history = [];

  constructor() {
    this.#log('Calculator Initialized.');
  }

  #log(operation) {
    const timestamp = new Date().toISOString();
    this.#history.push({ operation, timestamp });
  }

  get history() {
    return [...this.#history];
  }

  static #parseFunction(fnString) {
    return new Function('return ' + fnString)();
  }

  compute(fnString, ...args) {
    const fn = ComplexCalculator.#parseFunction(fnString);
    const result = fn(...args);
    this.#log(`Computed: ${fnString}(${args.join(', ')}) = ${result}`);
    return result;
  }

  async computeAsync(fnString, ...args) {
    const promise = new Promise((resolve) => {
      setTimeout(() => resolve(this.compute(fnString, ...args)), 1000);
    });
    return await promise;
  }

  *historyIterator() {
    for (const record of this.#history) {
      yield `${record.timestamp}: ${record.operation}`;
    }
  }
}

 
const calc = new ComplexCalculator();
const functions = {
  add: 'a, b => a + b',
  multiply: 'a, b => a * b',
  complex: null
};

 
print(calc.compute(functions.add ?? '() => null', 2, 3));
print(calc.compute(functions.multiply ?? '() => null', 4, 5));

 
(async () => {
  const result = await calc.computeAsync(functions.complex?.() ?? 'a, b => a ** b', 2, 3);
  print(result);
})();

 
for (const record of calc.historyIterator()) {
  print(record);
}
