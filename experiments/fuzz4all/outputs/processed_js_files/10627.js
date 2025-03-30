class ComplexCalculator {
  #results = new Map();

  constructor() {
    this.#loadInitialData();
  }

  #loadInitialData() {
    this.#results.set('e', Math.E);
    this.#results.set('pi', Math.PI);
  }

  *fibonacci(n) {
    let [a, b] = [0, 1];
    while (n-- > 0) {
      [a, b] = [b, a + b];
      yield a;
    }
  }

  memoize(fn) {
    const cache = new WeakMap();
    return function (...args) {
      if (!cache.has(args[0])) {
        cache.set(args[0], fn.apply(this, args));
      }
      return cache.get(args[0]);
    };
  }

  complexOperation(x, y) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = Math.pow(x, y) / Math.sqrt(x + y);
        this.#results.set(`op_${x}_${y}`, result);
        resolve(result);
      }, 1000);
    });
  }

  async getComplexOperationResult(x, y) {
    const result = await this.complexOperation(x, y);
    print(`Complex Operation Result for (${x}, ${y}):`, result);
  }

  [Symbol.iterator]() {
    return this.#results.entries();
  }
}

const calculator = new ComplexCalculator();

calculator.getComplexOperationResult(5, 3);

const memoizedFactorial = calculator.memoize(function factorial(n) {
  return n <= 1 ? 1 : n * factorial(n - 1);
});

print('Factorial of 5:', memoizedFactorial(5));
print('Memoized Factorial of 5:', memoizedFactorial(5));

const fib = calculator.fibonacci(10);
print('First 10 Fibonacci numbers:', [...fib]);

print('Calculator Results Map:');
for (const [key, value] of calculator) {
  print(`${key}: ${value}`);
}
