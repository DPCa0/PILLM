class AsyncFibonacci {
  constructor() {
    this.memo = new Map();
  }

  async compute(n) {
    if (n < 2) return n;
    if (this.memo.has(n)) return this.memo.get(n);

    const promise1 = this.compute(n - 1);
    const promise2 = this.compute(n - 2);

    const [result1, result2] = await Promise.all([promise1, promise2]);
    const result = result1 + result2;
    
    this.memo.set(n, result);
    return result;
  }
}

async function* fibonacciSequence(limit) {
  const fib = new AsyncFibonacci();
  for (let i = 0; i < limit; i++) {
    yield await fib.compute(i);
  }
}

(async () => {
  const maxFibNumber = 10;
  for await (const num of fibonacciSequence(maxFibNumber)) {
    print(num);
  }
})();
