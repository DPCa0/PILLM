class FibonacciGenerator {
  constructor(limit) {
    this.limit = limit;
    this.memo = new Map([[0, 0], [1, 1]]);
  }

  *generate() {
    let [a, b] = [0, 1];
    while (this.limit--) {
      yield a;
      [a, b] = [b, a + b];
    }
  }

  fibonacci(n) {
    if (this.memo.has(n)) return this.memo.get(n);
    let result = this.fibonacci(n - 1) + this.fibonacci(n - 2);
    this.memo.set(n, result);
    return result;
  }

  async run() {
    print("Fibonacci Sequence:");
    for (const num of this.generate()) {
      print(num);
    }

    print("\nMemoized Fibonacci Calculation:");
    print(await this.memoizedFibonacci(10));
  }

  memoizedFibonacci(n) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.fibonacci(n)), 1000);
    });
  }
}

(async () => {
  const fibGen = new FibonacciGenerator(10);
  await fibGen.run();
})();
