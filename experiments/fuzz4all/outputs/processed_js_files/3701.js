class Fibonacci {
  constructor() {
    this.memo = new Map();
  }

  *[Symbol.iterator]() {
    let a = 0, b = 1;
    while (true) {
      yield a;
      [a, b] = [b, a + b];
    }
  }

  fibonacci(n) {
    if (n <= 1) return n;
    if (this.memo.has(n)) return this.memo.get(n);
    let result = this.fibonacci(n - 1) + this.fibonacci(n - 2);
    this.memo.set(n, result);
    return result;
  }

  async calculateAsync(n) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.fibonacci(n)), 0);
    });
  }
}

const fib = new Fibonacci();

(async () => {
  print("First 10 Fibonacci numbers:");
  let count = 0;
  for (const num of fib) {
    if (count++ >= 10) break;
    print(num);
  }

  print("\nAsync Fibonacci calculation:");
  const result = await fib.calculateAsync(20);
  print(`Fibonacci(20): ${result}`);
})();
