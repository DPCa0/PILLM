class Fibonacci {
  constructor() {
    this.memo = new Map();
  }

  calculate(n) {
    if (this.memo.has(n)) return this.memo.get(n);
    if (n < 2) return n;
    const result = this.calculate(n - 1) + this.calculate(n - 2);
    this.memo.set(n, result);
    return result;
  }

  *generator(n) {
    let a = 0, b = 1, currentIndex = 0;
    while (currentIndex++ < n) {
      yield a;
      [a, b] = [b, a + b];
    }
  }
}

const fib = new Fibonacci();
const fibSequence = Array.from(fib.generator(10));
print(fibSequence);

const asyncOperation = (time) => new Promise(resolve => setTimeout(() => resolve(`Completed in ${time}ms`), time));

async function performAsyncOperations() {
  try {
    const results = await Promise.all([
      asyncOperation(1000),
      asyncOperation(500),
      asyncOperation(1500)
    ]);
    print(results);
  } catch (err) {
    console.error('Error in async operations', err);
  }
}

performAsyncOperations();

const higherOrderFunction = fn => (...args) => {
  print(`Called with arguments: ${args}`);
  return fn(...args);
};

const sum = (a, b) => a + b;
const loggedSum = higherOrderFunction(sum);
print(loggedSum(5, 10));

const recursiveProxy = (target, handler) => new Proxy(target, {
  get(target, prop, receiver) {
    if (typeof target[prop] === 'object' && target[prop] !== null) {
      return new Proxy(target[prop], handler);
    }
    return Reflect.get(...arguments);
  }
});

const nestedObj = { level1: { level2: { level3: 'deep value' }}};
const proxy = recursiveProxy(nestedObj, {
  get(target, prop) {
    print(`Accessing property: ${prop}`);
    return target[prop];
  }
});

print(proxy.level1.level2.level3);
