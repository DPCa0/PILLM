class AsyncFibonacci {
  constructor() {
    this.memo = new Map([[0, 0], [1, 1]]);
  }

  async compute(n) {
    if (this.memo.has(n)) {
      return this.memo.get(n);
    }
    const value = await Promise.all([this.compute(n - 1), this.compute(n - 2)]).then(
      ([a, b]) => a + b
    );
    this.memo.set(n, value);
    return value;
  }
}

(async () => {
  const fib = new AsyncFibonacci();
  const target = 10;
  const sequence = await Promise.all(
    Array.from({ length: target }, (_, i) => fib.compute(i))
  );

  print(`Fibonacci sequence up to F(${target}):`, sequence);

  const reversed = [...sequence].reverse();
  print("Reversed sequence:", reversed);

  const sumOfSquares = sequence.reduce((acc, num) => acc + num ** 2, 0);
  print("Sum of squares of the sequence:", sumOfSquares);
})();
