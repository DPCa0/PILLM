class Fibonacci {
  constructor() {
    this.memo = new Map();
  }

  calculate(n) {
    if (n <= 1) return n;
    if (this.memo.has(n)) return this.memo.get(n);

    const value = this.calculate(n - 1) + this.calculate(n - 2);
    this.memo.set(n, value);
    return value;
  }
}

const fibonacciProxy = new Proxy(new Fibonacci(), {
  get(target, prop) {
    if (typeof target[prop] === 'function') {
      return function (...args) {
        print(`Calling ${prop} with arguments:`, args);
        const result = target[prop].apply(target, args);
        print(`Result of ${prop}:`, result);
        return result;
      };
    }
    return target[prop];
  }
});

async function* asyncFibonacci(n) {
  let [a, b] = [0, 1];
  for (let i = 0; i < n; i++) {
    yield new Promise(resolve => setTimeout(() => resolve(a), 100));
    [a, b] = [b, a + b];
  }
}

(async () => {
  print("Fibonacci sequence using Proxy and Memoization:");
  fibonacciProxy.calculate(10);

  print("\nAsynchronous Fibonacci sequence:");
  for await (let num of asyncFibonacci(10)) {
    print(num);
  }
})();
