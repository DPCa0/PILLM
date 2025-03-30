class FibonacciSequence {
  constructor(limit) {
    this.limit = limit;
    this.cache = new Map();
  }

  *[Symbol.iterator]() {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < this.limit; i++) {
      [prev, curr] = [curr, prev + curr];
      yield prev;
    }
  }

  memoizedFib(n) {
    if (this.cache.has(n)) return this.cache.get(n);
    if (n <= 1) return n;
    const result = this.memoizedFib(n - 1) + this.memoizedFib(n - 2);
    this.cache.set(n, result);
    return result;
  }
}

const asyncDouble = async (x) => new Promise((resolve) => {
  setTimeout(() => resolve(x * 2), 1000);
});

const displayFibonacci = async () => {
  const fibSeq = new FibonacciSequence(10);
  for (const num of fibSeq) {
    const doubled = await asyncDouble(num);
    print(`Fibonacci: ${num}, Doubled: ${doubled}`);
  }
};

displayFibonacci().catch(console.error);
