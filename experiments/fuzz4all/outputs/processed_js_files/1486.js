class Fibonacci {
  constructor() {
    this.memo = new Map([[0, 0], [1, 1]]);
  }

  *generator(n) {
    let [a, b] = [0, 1];
    for (let i = 0; i < n; i++) {
      yield a;
      [a, b] = [b, a + b];
    }
  }

  calculate(n) {
    if (!this.memo.has(n)) {
      this.memo.set(n, this.calculate(n - 1) + this.calculate(n - 2));
    }
    return this.memo.get(n);
  }

  async logFibonacciSeries(n) {
    print(`Fibonacci series up to ${n}:`);
    const gen = this.generator(n);
    for (let i = 0; i < n; i++) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      print(`Fib(${i}) = ${gen.next().value}`);
    }
  }
}

const fib = new Fibonacci();
fib.logFibonacciSeries(10);
print(`Fibonacci(10) = ${fib.calculate(10)}`);
