class Fibonacci {
  constructor(limit) {
    this.limit = limit;
    this.cache = new Map();
  }

  *generate() {
    let a = 0, b = 1;
    while (a <= this.limit) {
      yield a;
      [a, b] = [b, a + b];
    }
  }

  async process() {
    for await (const num of this.generate()) {
      this.cache.set(num, this.factorial(num));
    }
  }

  factorial(n) {
    return n <= 1 ? 1 : n * this.factorial(n - 1);
  }

  static async show(limit) {
    const fib = new Fibonacci(limit);
    await fib.process();
    print([...fib.cache.entries()]);
  }
}

(async () => {
  try {
    await Fibonacci.show(20);
  } catch (error) {
    console.error("Error:", error);
  }
})();
