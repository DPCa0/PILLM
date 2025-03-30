class AsyncFibonacci {
  constructor() {
    this.cache = new Map();
  }

  async compute(n) {
    if (n < 2) return n;
    if (this.cache.has(n)) return this.cache.get(n);

    const fibNMinus1 = this.compute(n - 1);
    const fibNMinus2 = this.compute(n - 2);

    const result = (await fibNMinus1) + (await fibNMinus2);
    this.cache.set(n, result);
    return result;
  }
}

const printFibonacciSequence = async (length) => {
  const fib = new AsyncFibonacci();

  for await (const value of (async function* generateFibSequence() {
    for (let i = 0; i < length; i++) {
      yield await fib.compute(i);
    }
  })()) {
    print(value);
  }
};

 
printFibonacciSequence(10);
