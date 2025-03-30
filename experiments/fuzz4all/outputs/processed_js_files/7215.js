class Fibonacci {
  #memo = new Map([[0, 0], [1, 1]]);
  
  constructor() {
    this[Symbol.iterator] = function*() {
      let i = 0;
      while (true) yield this.calculate(i++);
    };
  }

  calculate(n) {
    if (!this.#memo.has(n)) {
      this.#memo.set(n, this.calculate(n - 1) + this.calculate(n - 2));
    }
    return this.#memo.get(n);
  }
}

const fib = new Fibonacci();

(async () => {
  for (const n of fib) {
    if (n > 1000) break;
    await new Promise(resolve => setTimeout(resolve, 100));  
    print(n);
  }
})();
