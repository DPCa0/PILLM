class Fibonacci {
  constructor() {
    this.memo = new Map();
  }
  
  calculate(n) {
    if (n <= 1) return n;
    if (this.memo.has(n)) return this.memo.get(n);
    
    const result = this.calculate(n - 1) + this.calculate(n - 2);
    this.memo.set(n, result);
    return result;
  }

  *sequence(limit) {
    for (let i = 0; i < limit; i++) {
      yield this.calculate(i);
    }
  }
}

const asyncFibonacciSequence = async function*(limit) {
  const fibonacci = new Fibonacci();
  for (const num of fibonacci.sequence(limit)) {
    await new Promise(resolve => setTimeout(resolve, 100));  
    yield num;
  }
};

(async () => {
  const limit = 10;
  const fibGen = asyncFibonacciSequence(limit);
  
  for await (const num of fibGen) {
    print(num);
  }
})();
