class Fibonacci {
  constructor(limit) {
    this.limit = limit;
    this.memo = new Map();
  }

  *generate() {
    let [a, b] = [0, 1];
    for (let i = 0; i < this.limit; i++) {
      yield a;
      [a, b] = [b, a + b];
    }
  }

  memoizedFib(n) {
    if (this.memo.has(n)) return this.memo.get(n);
    if (n <= 1) return n;
    const result = this.memoizedFib(n - 1) + this.memoizedFib(n - 2);
    this.memo.set(n, result);
    return result;
  }

  async logFibonacciAsync() {
    const promises = Array.from(this.generate()).map((num, idx) => 
      new Promise(resolve => setTimeout(() => {
        print(`Fibonacci(${idx}) = ${num}`);
        resolve();
      }, idx * 100))
    );
    await Promise.all(promises);
  }
}

(async () => {
  const fib = new Fibonacci(10);

  print("Memoized Fibonacci:");
  print(fib.memoizedFib(9));

  print("\nAsynchronous Fibonacci sequence:");
  await fib.logFibonacciAsync();
})();
