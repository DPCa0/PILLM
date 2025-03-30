class Fibonacci {
  constructor() {
    this.cache = new Map();
    this[Symbol.iterator] = function* () {
      let a = 0, b = 1;
      yield a;
      yield b;
      while (true) {
        [a, b] = [b, a + b];
        yield b;
      }
    };
  }

  get(n) {
    if (this.cache.has(n)) return this.cache.get(n);
    if (n < 2) return n;
    const result = this.get(n - 1) + this.get(n - 2);
    this.cache.set(n, result);
    return result;
  }

  async *asyncGenerator(limit) {
    for await (const num of this) {
      if (num > limit) break;
      yield num;
    }
  }
}

(async () => {
  const fibonacci = new Fibonacci();
  print('5th Fibonacci Number (with memoization):', fibonacci.get(5));

  const limit = 50;
  print(`Fibonacci sequence up to ${limit}:`);
  for await (const num of fibonacci.asyncGenerator(limit)) {
    print(num);
  }
})();
