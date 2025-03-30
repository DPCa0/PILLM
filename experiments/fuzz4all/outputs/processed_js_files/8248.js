class Fibonacci {
  constructor(limit) {
    this.limit = limit;
    this.memo = new Map();
  }

  *generateSequence() {
    let [a, b] = [0, 1];
    for (let i = 0; i < this.limit; i++) {
      yield a;
      [a, b] = [b, a + b];
    }
  }

  calculateNth(n) {
    if (this.memo.has(n)) return this.memo.get(n);
    if (n < 2) return n;
    const result = this.calculateNth(n - 1) + this.calculateNth(n - 2);
    this.memo.set(n, result);
    return result;
  }
}

const asyncProcess = async (limit) => {
  const fibonacci = new Fibonacci(limit);
  const sequence = fibonacci.generateSequence();
  
  for await (const num of sequence) {
    print(`Fibonacci sequence: ${num}`);
  }

  const nthNumber = await new Promise((resolve) => {
    setTimeout(() => resolve(fibonacci.calculateNth(limit - 1)), 1000);
  });

  print(`The ${limit}-th Fibonacci number is: ${nthNumber}`);
};

(async () => {
  const limit = 10;
  await asyncProcess(limit);
})();
