class Fibonacci {
  constructor(max) {
    this.max = max;
    this.memo = new Map();
  }

  *generate() {
    let [a, b] = [0, 1];
    while (a <= this.max) {
      yield a;
      [a, b] = [b, a + b];
    }
  }

  calc(n) {
    if (this.memo.has(n)) return this.memo.get(n);
    if (n <= 1) return n;
    const result = this.calc(n - 1) + this.calc(n - 2);
    this.memo.set(n, result);
    return result;
  }
}

const asyncCalculate = async (fib, n) => {
  const result = await Promise.resolve(fib.calc(n));
  print(`Fibonacci(${n}):`, result);
};

(async () => {
  const fib = new Fibonacci(100);
  
  print("Generated Sequence up to 100:");
  for (const num of fib.generate()) {
    print(num);
  }

  print("\nCalculating Fibonacci with memoization:");
  await Promise.all([20, 25, 30, 35, 40].map(n => asyncCalculate(fib, n)));

  print("\nUsing Proxy to track method calls:");
  const handler = {
    get(target, property) {
      if (typeof target[property] === 'function') {
        return function (...args) {
          print(`Called ${property} with`, args);
          return target[property].apply(this, args);
        };
      }
      return target[property];
    }
  };

  const proxiedFib = new Proxy(fib, handler);
  print(proxiedFib.calc(10));
})();
