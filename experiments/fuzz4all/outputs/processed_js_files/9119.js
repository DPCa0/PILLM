class Fibonacci {
  constructor() {
    this.memo = new Map();
  }

  calculate(n) {
    if (n <= 1) return n;
    if (this.memo.has(n)) return this.memo.get(n);

    let result = this.calculate(n - 1) + this.calculate(n - 2);
    this.memo.set(n, result);
    return result;
  }
}

async function* fibonacciGenerator(n) {
  const fibonacci = new Fibonacci();
  for (let i = 0; i <= n; i++) {
    yield await new Promise(resolve => {
      setTimeout(() => resolve(fibonacci.calculate(i)), 100);
    });
  }
}

(async () => {
  const fibGen = fibonacciGenerator(10);
  for await (const num of fibGen) {
    print(num);
  }
})();
