class Fibonacci {
  constructor() {
    this.memo = new Map([[0, 0], [1, 1]]);
  }

  *[Symbol.iterator]() {
    let n = 0;
    while (true) {
      yield this.calculate(n++);
    }
  }

  calculate(n) {
    if (this.memo.has(n)) {
      return this.memo.get(n);
    }
    let value = this.calculate(n - 1) + this.calculate(n - 2);
    this.memo.set(n, value);
    return value;
  }

  async fetchFibonacci(n) {
    const promise = new Promise((resolve) => {
      setTimeout(() => resolve(this.calculate(n)), 1000);
    });
    return await promise;
  }
}

(async () => {
  const fibonacci = new Fibonacci();
  const sequence = fibonacci[Symbol.iterator]();

  print("Fibonacci sequence:");
  for (const n of sequence) {
    if (n > 1000) break;
    print(n);
  }

  print("Fetching 10th Fibonacci number asynchronously...");
  const tenth = await fibonacci.fetchFibonacci(10);
  print(`10th Fibonacci number: ${tenth}`);
})();
