class Fibonacci {
  #memo = new Map([[0, 0], [1, 1]]);  

  constructor(limit) {
    this.limit = limit;
  }

  *[Symbol.iterator]() {
    let a = 0, b = 1;
    for (let i = 0; i < this.limit; i++) {
      yield a;
      [a, b] = [b, a + b];
    }
  }

  async calculateAsync(n) {
    if (this.#memo.has(n)) return this.#memo.get(n);

    const result = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.calculate(n - 1) + this.calculate(n - 2));
      }, 0);
    });
    
    this.#memo.set(n, result);
    return result;
  }

  calculate(n) {
    if (this.#memo.has(n)) return this.#memo.get(n);

    const result = this.calculate(n - 1) + this.calculate(n - 2);
    this.#memo.set(n, result);
    return result;
  }
}

const fib = new Fibonacci(10);

(async () => {
  print('Synchronous Fibonacci:');
  for (const num of fib) {
    print(num);
  }

  print('Asynchronous Fibonacci:');
  for (let i = 0; i < fib.limit; i++) {
    print(await fib.calculateAsync(i));
  }
})();
