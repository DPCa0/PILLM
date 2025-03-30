class Fibonacci {
  #cache = new Map();

  constructor(n) {
    if (n <= 0) throw new Error('Input must be a positive integer.');
    this.limit = n;
  }

  *[Symbol.iterator]() {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < this.limit; i++) {
      yield curr;
      [prev, curr] = [curr, prev + curr];
    }
  }

  async calculateAsync(n) {
    if (this.#cache.has(n)) return this.#cache.get(n);

    const fibonacci = async (num) => {
      if (num <= 1) return num;
      if (this.#cache.has(num)) return this.#cache.get(num);

      const result = await Promise.all([fibonacci(num - 1), fibonacci(num - 2)]);
      const value = result[0] + result[1];
      this.#cache.set(num, value);
      return value;
    };

    const result = await fibonacci(n);
    this.#cache.set(n, result);
    return result;
  }

  logFibonacciNumbers() {
    print(`Fibonacci sequence up to ${this.limit}:`);
    for (const num of this) {
      print(num);
    }
  }
}

(async () => {
  const fib = new Fibonacci(10);
  fib.logFibonacciNumbers();
  const result = await fib.calculateAsync(10);
  print(`10th Fibonacci number (calculated asynchronously): ${result}`);
})();
