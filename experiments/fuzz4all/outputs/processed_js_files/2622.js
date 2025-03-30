class FibonacciGenerator {
  constructor(limit) {
    this.limit = limit;
    this.memo = new Proxy({}, {
      get: (target, name) => name in target ? target[name] : this.fib(name)
    });
  }

  fib(n) {
    if (n <= 1) return n;
    return this.memo[n - 1] + this.memo[n - 2];
  }

  *[Symbol.iterator]() {
    let i = 0;
    while (true) {
      const val = this.memo[i];
      if (val > this.limit) return;
      yield val;
      i++;
    }
  }
}

(async () => {
  const limit = 100;
  const fibonacci = new FibonacciGenerator(limit);

  for await (let num of fibonacci) {
    print(num);
  }
})();
