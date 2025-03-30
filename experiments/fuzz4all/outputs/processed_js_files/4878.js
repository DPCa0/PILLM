class Fibonacci {
  constructor(limit) {
    this.limit = limit;
    this.memo = new Map();
  }

  *[Symbol.iterator]() {
    let [a, b] = [0, 1];
    while (a <= this.limit) {
      yield a;
      [a, b] = [b, a + b];
    }
  }

  async calculate(n) {
    if (this.memo.has(n)) return this.memo.get(n);
    if (n <= 1) return n;
    const result = await Promise.all([
      this.calculate(n - 1),
      this.calculate(n - 2),
    ]).then(([n1, n2]) => n1 + n2);
    this.memo.set(n, result);
    return result;
  }
}

const fib = new Fibonacci(100);

(async () => {
  print('Fibonacci sequence up to 100:');
  print([...fib]);

  print('Calculating Fibonacci of 10:');
  print(await fib.calculate(10));
})();
