 
class ComplexCalculator {
  #result = 0;

  get result() {
    return this.#result;
  }

  set result(value) {
    this.#result = value;
  }

  constructor(value = 0) {
    this.#result = value;
  }

   
  static *sequence(start = 0, step = 1) {
    let n = start;
    while (true) {
      yield n;
      n += step;
    }
  }

   
  async addAsync(a) {
    const result = await new Promise((resolve) => {
      setTimeout(() => resolve(this.#result + a), 1000);
    });
    this.#result = result;
  }
}

 
const calculatorProxyHandler = {
  set(target, property, value) {
    if (property === 'result' && (typeof value !== 'number' || value < 0)) {
      throw new Error('Result must be a non-negative number');
    }
    target[property] = value;
    return true;
  }
};

const calc = new Proxy(new ComplexCalculator(), calculatorProxyHandler);

 
function computeOperations(...operations) {
  const [operation, ...args] = operations;
  switch (operation) {
    case 'add':
      return args.reduce((acc, val) => acc + val, 0);
    case 'multiply':
      return args.reduce((acc, val) => acc * val, 1);
    default:
      throw new Error('Unknown operation');
  }
}

 
(async () => {
  try {
    print('Initial result:', calc.result);
    const seq = ComplexCalculator.sequence(1);
    print('Sequence:', seq.next().value, seq.next().value, seq.next().value);

    calc.result = computeOperations('add', 1, 2, 3);
    print('After addition:', calc.result);

    calc.result = computeOperations('multiply', 2, 3);
    print('After multiplication:', calc.result);

    await calc.addAsync(5);
    print('After async addition:', calc.result);

    calc.result = -1;  
  } catch (e) {
    console.error(e.message);
  }
})();
