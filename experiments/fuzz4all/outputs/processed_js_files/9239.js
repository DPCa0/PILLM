class Fibonacci {
  constructor(limit) {
    this.limit = limit;
    this.memo = new Map();
    this[Symbol.iterator] = this.generator();
  }

  *generator() {
    let [a, b] = [0, 1];
    while (a <= this.limit) {
      yield a;
      [a, b] = [b, a + b];
    }
  }

  calc(n) {
    if (this.memo.has(n)) return this.memo.get(n);
    if (n < 2) return n;
    let result = this.calc(n - 1) + this.calc(n - 2);
    this.memo.set(n, result);
    return result;
  }

  async printSequence() {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    for (const num of this) {
      print(`Fibonacci: ${num}`);
      await delay(500);
    }
  }
}

(async () => {
  const fib = new Fibonacci(21);
  print(`10th Fibonacci Number: ${fib.calc(10)}`);
  await fib.printSequence();
})();
