class FibonacciGenerator {
  constructor(limit) {
    this.limit = limit;
    this.cache = new Map();
  }

  *generate() {
    let [a, b] = [0, 1];
    while (a <= this.limit) {
      yield a;
      [a, b] = [b, a + b];
    }
  }

  async memoizedFibonacci(n) {
    if (this.cache.has(n)) {
      return this.cache.get(n);
    }
    if (n < 2) return n;
    const result =
      (await this.memoizedFibonacci(n - 1)) +
      (await this.memoizedFibonacci(n - 2));
    this.cache.set(n, result);
    return result;
  }
}

(async () => {
  const limit = 1000;
  const fibGen = new FibonacciGenerator(limit);

  print('Fibonacci sequence up to', limit);
  for (let num of fibGen.generate()) {
    print(num);
  }

  const n = 10;
  print(`\nMemoized Fibonacci number for n=${n}`);
  print(await fibGen.memoizedFibonacci(n));
})();
