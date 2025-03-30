class Fibonacci {
  constructor() {
    this.memo = new Map();
  }
  
  *[Symbol.iterator]() {
    let [a, b] = [0, 1];
    while (true) {
      yield a;
      [a, b] = [b, a + b];
    }
  }

  fib(n) {
    if (n <= 1) return n;
    if (this.memo.has(n)) return this.memo.get(n);
    const value = this.fib(n - 1) + this.fib(n - 2);
    this.memo.set(n, value);
    return value;
  }

  async calculateAsync(n) {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    print(`Calculating Fibonacci(${n})...`);
    await delay(1000);
    const result = this.fib(n);
    print(`Fibonacci(${n}) = ${result}`);
    return result;
  }
}

(async () => {
  const fib = new Fibonacci();
  print("Fibonacci sequence:");
  for (const num of fib) {
    print(num);
    if (num > 50) break;
  }

  await Promise.all([10, 20, 30].map(n => fib.calculateAsync(n)));

  print("Finished calculations.");
})();
