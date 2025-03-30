class Fibonacci {
  constructor() {
    this.memo = new Map([[0, 0], [1, 1]]);
  }

  *[Symbol.iterator]() {
    let [prev, curr] = [0, 1];
    while (true) {
      yield curr;
      [prev, curr] = [curr, prev + curr];
    }
  }

  memoized(n) {
    if (this.memo.has(n)) return this.memo.get(n);
    const value = this.memoized(n - 1) + this.memoized(n - 2);
    this.memo.set(n, value);
    return value;
  }

  async calculateAsync(n) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.memoized(n)), 1000);
    });
  }
}

async function main() {
  const fib = new Fibonacci();

  print("First 10 Fibonacci numbers:");
  print([...fib].slice(0, 10));

  const asyncFibo = await fib.calculateAsync(10);
  print(`10th Fibonacci number calculated asynchronously: ${asyncFibo}`);

  const [a, b] = await Promise.all([
    fib.calculateAsync(20),
    fib.calculateAsync(30),
  ]);

  print(`20th Fibonacci: ${a}, 30th Fibonacci: ${b}`);
}

main().catch(console.error);
