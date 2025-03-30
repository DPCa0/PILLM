class Fibonacci {
  constructor(limit) {
    this.limit = limit;
    this[Symbol.iterator] = function* () {
      let a = 0, b = 1;
      yield a;
      while (b < this.limit) {
        yield b;
        [a, b] = [b, a + b];
      }
    };
  }

  static async printAsyncValues(fibSeq) {
    for await (const num of fibSeq) {
      print(`Fibonacci Number: ${num}`);
    }
  }
}

const sequence = new Fibonacci(1000);
Fibonacci.printAsyncValues(sequence);

const proxyHandler = {
  get(target, prop) {
    return prop in target ? target[prop] : `Property ${prop} not found`;
  },
  set(target, prop, value) {
    if (typeof value === 'number' && value > 0) {
      target[prop] = value;
      return true;
    }
    throw new TypeError('Value must be a positive number');
  }
};

const obj = new Proxy({ threshold: 500 }, proxyHandler);
try {
  obj.threshold = 600;
  print(`Threshold updated to: ${obj.threshold}`);
  obj.nonExistentProp;  
} catch (error) {
  console.error(error.message);
}

const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

const add10 = x => x + 10;
const double = x => x * 2;
const subtract5 = x => x - 5;

const calculate = pipe(add10, double, subtract5);
print(`Calculation Result: ${calculate(5)}`);
