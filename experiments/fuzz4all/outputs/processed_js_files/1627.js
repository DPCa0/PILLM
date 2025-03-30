class Fibonacci {
  constructor(limit) {
    this.limit = limit;
    this.cache = new Map();
  }

  *[Symbol.iterator]() {
    let [a, b] = [0, 1];
    for (let i = 0; i < this.limit; i++) {
      yield a;
      [a, b] = [b, a + b];
    }
  }

  async calcAsync(n) {
    if (this.cache.has(n)) return this.cache.get(n);
    if (n <= 1) return n;
    const result = await Promise.all([this.calcAsync(n - 1), this.calcAsync(n - 2)]).then(
      ([prev1, prev2]) => prev1 + prev2
    );
    this.cache.set(n, result);
    return result;
  }
}

(async () => {
  const fibonacci = new Fibonacci(10);
  
  print("Iterative:");
  for (const num of fibonacci) {
    print(num);
  }
  
  print("\nAsync Recursive:");
  for (let i = 0; i < 10; i++) {
    print(await fibonacci.calcAsync(i));
  }
})();

