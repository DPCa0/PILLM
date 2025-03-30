class Fibonacci {
  constructor(limit) {
    this.limit = limit;
    this.memo = new Map();
  }

  *[Symbol.iterator]() {
    let [a, b] = [0, 1];
    for (let i = 0; i < this.limit; i++) {
      yield a;
      [a, b] = [b, a + b];
    }
  }

  recursiveFib(n) {
    if (this.memo.has(n)) return this.memo.get(n);
    if (n < 2) return n;
    const result = this.recursiveFib(n - 1) + this.recursiveFib(n - 2);
    this.memo.set(n, result);
    return result;
  }

  static async logFibs() {
    const fib = new Fibonacci(10);
    for (const num of fib) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      print(num);
    }
  }
}

(async () => {
  print("Iterative Fibonacci sequence:");
  await Fibonacci.logFibs();

  const fib = new Fibonacci(10);
  print("\nRecursive Fibonacci values with memoization:");
  [...Array(10).keys()].forEach((n) => print(fib.recursiveFib(n)));
})();
