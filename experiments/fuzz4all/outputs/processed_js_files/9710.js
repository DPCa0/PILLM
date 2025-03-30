class FibonacciSequence {
  constructor(limit) {
    this.limit = limit;
    this.memo = new Map();
  }

  *[Symbol.iterator]() {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < this.limit; i++) {
      yield curr;
      [prev, curr] = [curr, prev + curr];
    }
  }

  async calculate(n) {
    if (this.memo.has(n)) return this.memo.get(n);
    if (n <= 1) return n;
    const result = (await this.calculate(n - 1)) + (await this.calculate(n - 2));
    this.memo.set(n, result);
    return result;
  }
}

(async () => {
  const fib = new FibonacciSequence(10);
  print("Fibonacci sequence using iterator:");
  for (const num of fib) {
    print(num);
  }

  print("Calculate Fibonacci recursively with memoization:");
  for (let i = 0; i < 10; i++) {
    print(await fib.calculate(i));
  }

  print("Promise-based asynchronous task:");
  const task = new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.5;
      success ? resolve("Task completed successfully!") : reject("Task failed.");
    }, 1000);
  });

  task
    .then((msg) => console.log(msg))
    .catch((err) => print(err));
})();
