class FibonacciGenerator {
  constructor() {
    this.memo = new Map([[0, 0], [1, 1]]);
  }
  
  *generate(n) {
    for (let i = 0; i <= n; i++) {
      yield this.fib(i);
    }
  }
  
  fib(n) {
    if (this.memo.has(n)) return this.memo.get(n);
    const value = this.fib(n - 1) + this.fib(n - 2);
    this.memo.set(n, value);
    return value;
  }
}

(async () => {
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  const gen = new FibonacciGenerator();
  
  for await (const num of gen.generate(10)) {
    print(num);
    await delay(500);
  }
})();
