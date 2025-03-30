class AsyncFibonacci {
  #cache = new Map();

  constructor() {
     
    this.#cache.set(0, 0);
    this.#cache.set(1, 1);
  }

  async calculate(n) {
    if (this.#cache.has(n)) {
      return this.#cache.get(n);
    }

     
    return new Promise((resolve) => {
      setTimeout(async () => {
        const result = await this.calculate(n - 1) + await this.calculate(n - 2);
        this.#cache.set(n, result);
        resolve(result);
      }, 10);
    });
  }
}

const logFibonacci = async (n) => {
  const fib = new AsyncFibonacci();
  const promises = [...Array(n).keys()].map(async (i) => {
    const value = await fib.calculate(i);
    print(`Fib(${i}) = ${value}`);
  });

  await Promise.all(promises);
};

(async () => {
  await logFibonacci(10);
})();
