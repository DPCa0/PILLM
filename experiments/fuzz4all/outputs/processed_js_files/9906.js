class FibonacciSequence {
  constructor(limit) {
    this.limit = limit;
    this.cache = new Map();
  }

  *generator() {
    let [a, b] = [0, 1];
    for (let i = 0; i < this.limit; i++) {
      yield a;
      [a, b] = [b, a + b];
    }
  }

  memoized(n) {
    if (n <= 1) return n;
    if (this.cache.has(n)) return this.cache.get(n);
    let value = this.memoized(n - 1) + this.memoized(n - 2);
    this.cache.set(n, value);
    return value;
  }
}

(async () => {
  const limit = 10;
  const sequence = new FibonacciSequence(limit);

  print(`Fibonacci sequence up to ${limit}:`);
  for (const num of sequence.generator()) {
    print(num);
  }

  print(`\nMemoized Fibonacci values:`);
  await Promise.all(
    Array.from({ length: limit }, (_, i) =>
      new Promise((resolve) =>
        setTimeout(() => {
          print(`Fib(${i}) = ${sequence.memoized(i)}`);
          resolve();
        }, Math.random() * 1000)
      )
    )
  );
})();
