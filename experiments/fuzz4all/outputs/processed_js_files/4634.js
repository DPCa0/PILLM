class FibonacciGenerator {
  constructor() {
    this.memo = new Map([[0, 0], [1, 1]]);
  }

  *[Symbol.iterator]() {
    let a = 0, b = 1;
    while (true) {
      yield a;
      [a, b] = [b, a + b];
    }
  }

  fibonacci(n) {
    if (this.memo.has(n)) return this.memo.get(n);
    let value = this.fibonacci(n - 1) + this.fibonacci(n - 2);
    this.memo.set(n, value);
    return value;
  }
}

const asyncFibonacci = async (n) => {
  const generator = new FibonacciGenerator();
  return generator.fibonacci(n);
};

(async () => {
  const fibSeq = new FibonacciGenerator()[Symbol.iterator]();
  for (const value of fibSeq) {
    print(value);
    if (value > 50) break;
  }

  const result = await asyncFibonacci(10);
  print(`Fibonacci(10): ${result}`);
})();
