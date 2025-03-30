class Fibonacci {
  constructor() {
    this.memo = new Proxy({}, {
      get: (target, prop) => prop in target ? target[prop] : this.compute(parseInt(prop))
    });
  }
  
  compute(n) {
    if (n <= 1) return n;
    if (this.memo[n] !== undefined) return this.memo[n];
    this.memo[n] = this.compute(n - 1) + this.compute(n - 2);
    return this.memo[n];
  }
}

async function* generateFibonacciSequence(count) {
  const fib = new Fibonacci();
  for (let i = 0; i < count; i++) {
    yield new Promise(resolve => setTimeout(() => resolve(fib.compute(i)), 100));
  }
}

(async function() {
  const fibonacciGenerator = generateFibonacciSequence(10);
  for await (const value of fibonacciGenerator) {
    print(value);
  }
})();
