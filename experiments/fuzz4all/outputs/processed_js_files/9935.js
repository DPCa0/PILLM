class Fibonacci {
  #cache = new Map();

  *[Symbol.iterator]() {
    let [a, b] = [0, 1];
    while (true) {
      yield a;
      [a, b] = [b, a + b];
    }
  }

  calculate(n) {
    if (n < 0) throw new Error("Negative arguments not supported");
    if (n <= 1) return n;
    if (this.#cache.has(n)) return this.#cache.get(n);

    let result = this.calculate(n - 1) + this.calculate(n - 2);
    this.#cache.set(n, result);
    return result;
  }

  async asyncCalculate(n) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          resolve(this.calculate(n));
        } catch (error) {
          reject(error);
        }
      }, 0);
    });
  }
}

 
(async () => {
  const fib = new Fibonacci();
  print([...fib][Symbol.iterator]().next().value);  

  for (let n of fib) {
    if (n > 1000) break;  
    print(n);
  }

  const nth = 20;
  print(`F(${nth}) = ${await fib.asyncCalculate(nth)}`);
})();
