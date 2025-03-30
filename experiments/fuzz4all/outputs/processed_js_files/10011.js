class FibonacciSequence {
  constructor() {
    this.memo = new Map();
  }

  compute(n) {
    if (n < 0) throw new Error("Negative numbers are not allowed");
    if (n <= 1) return n;
    if (this.memo.has(n)) return this.memo.get(n);

    const result = this.compute(n - 1) + this.compute(n - 2);
    this.memo.set(n, result);
    return result;
  }

  *generator(limit) {
    for (let i = 0; i < limit; i++) {
      yield this.compute(i);
    }
  }

  static async printSequence(limit) {
    const fibonacci = new FibonacciSequence();
    const sequence = fibonacci.generator(limit);
    for await (const num of sequence) {
      print(num);
    }
  }
}

(async () => {
  try {
    await FibonacciSequence.printSequence(10);
  } catch (e) {
    console.error(e.message);
  }
})();
