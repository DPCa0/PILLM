class Fibonacci {
  constructor() {
    this.memo = new Map();
    this.memo.set(0, 0);
    this.memo.set(1, 1);
  }
  
  calculate(n) {
    if (this.memo.has(n)) {
      return this.memo.get(n);
    }
    const value = this.calculate(n - 1) + this.calculate(n - 2);
    this.memo.set(n, value);
    return value;
  }
}

function* fibonacciGenerator(limit) {
  const fib = new Fibonacci();
  let i = 0;
  while (i < limit) {
    yield fib.calculate(i++);
  }
}

(async function main() {
  const limit = 10;
  const results = [];
  
  const promise = new Promise((resolve) => {
    setTimeout(() => resolve('Done with delay'), 2000);
  });

  for await (const fib of fibonacciGenerator(limit)) {
    results.push(fib);
  }

  print('Fibonacci Sequence:', results);
  print(await promise);
})();

