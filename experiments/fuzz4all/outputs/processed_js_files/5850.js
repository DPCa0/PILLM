class Fibonacci {
  constructor(limit) {
    this.limit = limit;
    this.memo = new Map();
  }

  *[Symbol.iterator]() {
    let [prev, curr] = [0, 1];
    while (curr <= this.limit) {
      yield curr;
      [prev, curr] = [curr, prev + curr];
    }
  }

  async calculateAsync(n) {
    if (n <= 1) return n;
    if (this.memo.has(n)) return this.memo.get(n);

    const result = await Promise.all([
      this.calculateAsync(n - 1),
      this.calculateAsync(n - 2),
    ]).then(([a, b]) => a + b);

    this.memo.set(n, result);
    return result;
  }
}

(async () => {
  const fib = new Fibonacci(100);
  print("Fibonacci sequence up to 100:");
  for (let num of fib) {
    print(num);
  }

  const asyncFibNumber = await fib.calculateAsync(10);
  print(`The 10th Fibonacci number is ${asyncFibNumber}`);
})();
