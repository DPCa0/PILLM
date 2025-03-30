 
function logMethod(target, key, descriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function(...args) {
    print(`Calling ${key} with arguments: ${JSON.stringify(args)}`);
    const result = originalMethod.apply(this, args);
    print(`Return value: ${JSON.stringify(result)}`);
    return result;
  };
  return descriptor;
}

 
class ComplexCalculator {
  #history = [];

  constructor() {
    this.name = 'AdvancedCalc';
  }

  @logMethod
  add(a, b) {
    const result = a + b;
    this.#recordHistory('add', result);
    return result;
  }

  @logMethod
  multiply(a, b) {
    const result = a * b;
    this.#recordHistory('multiply', result);
    return result;
  }

  #recordHistory(operation, result) {
    this.#history.push({ operation, result });
  }

  get history() {
    return [...this.#history];
  }

  static #instance;

  static getInstance() {
    if (!ComplexCalculator.#instance) {
      ComplexCalculator.#instance = new ComplexCalculator();
    }
    return ComplexCalculator.#instance;
  }
}

 
async function performCalculations() {
  const calculator = ComplexCalculator.getInstance();

  const operations = [
    { method: 'add', params: [5, 10] },
    { method: 'multiply', params: [7, 3] }
  ];

  for (const { method, params } of operations) {
    await new Promise(resolve => setTimeout(resolve, 1000));  
    calculator[method](...params);
  }

  print('Calculation history:', calculator.history);
}

performCalculations();
