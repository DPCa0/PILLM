class Fibonacci {
  #memo = new Map();
  
  constructor() {
    this.#memo.set(0, 0).set(1, 1);
  }

  calculate(n) {
    if (this.#memo.has(n)) return this.#memo.get(n);

    const result = this.calculate(n - 1) + this.calculate(n - 2);
    this.#memo.set(n, result);
    return result;
  }

  async *generate(n) {
    for (let i = 0; i <= n; i++) {
      yield new Promise(resolve => setTimeout(() => resolve(this.calculate(i)), 100));
    }
  }
}

const executeAsyncFibonacci = async () => {
  const fib = new Fibonacci();
  const series = fib.generate(10);

  for await (const number of series) {
    print(number);
  }
};

executeAsyncFibonacci();
