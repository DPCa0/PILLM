const { performance } = require('perf_hooks');

class AdvancedFeatures {
  constructor() {
    this.data = new Map();
  }

  async simulateAsyncProcessing(key, value) {
    return new Promise(resolve => setTimeout(() => {
      print(`Processed: ${key} = ${value}`);
      resolve(value * value);
    }, 1000));
  }

  async addData(key, value) {
    if (!this.data.has(key)) {
      const squaredValue = await this.simulateAsyncProcessing(key, value);
      this.data.set(key, squaredValue);
    }
  }

  async processData(entries) {
    const promises = entries.map(([key, value]) => this.addData(key, value));
    await Promise.all(promises);
  }

  *[Symbol.iterator]() {
    for (const [key, value] of this.data) {
      yield [key, value];
    }
  }

  static memoize(fn) {
    const cache = new WeakMap();
    return (...args) => {
      if (!cache.has(fn)) cache.set(fn, new Map());
      const fnCache = cache.get(fn);
      const key = JSON.stringify(args);
      if (!fnCache.has(key)) {
        fnCache.set(key, fn(...args));
      }
      return fnCache.get(key);
    };
  }
}

const calculateFibonacci = n => (n <= 1 ? n : calculateFibonacci(n - 1) + calculateFibonacci(n - 2));
const memoizedFib = AdvancedFeatures.memoize(calculateFibonacci);

const advFeatures = new AdvancedFeatures();
const start = performance.now();

(async () => {
  await advFeatures.processData([['a', 1], ['b', 2], ['c', 3]]);
  for (const [key, value] of advFeatures) {
    print(`Stored: ${key} = ${value}`);
  }

  print(`Memoized Fibonacci(10): ${memoizedFib(10)}`);
  print(`Memoized Fibonacci(20): ${memoizedFib(20)}`);
  print(`Memoized Fibonacci(30): ${memoizedFib(30)}`);
  
  const end = performance.now();
  print(`Execution time: ${(end - start).toFixed(2)} ms`);
})();
