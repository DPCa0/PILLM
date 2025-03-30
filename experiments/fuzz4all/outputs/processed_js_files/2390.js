class Fibonacci {
  constructor(limit) {
    this.limit = limit;
    this.memo = new Map();
  }

  *generateSequence() {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < this.limit; i++) {
      yield curr;
      [prev, curr] = [curr, prev + curr];
    }
  }

  memoizedFibonacci(n) {
    if (this.memo.has(n)) {
      return this.memo.get(n);
    }
    if (n <= 1) {
      return n;
    }
    const value = this.memoizedFibonacci(n - 1) + this.memoizedFibonacci(n - 2);
    this.memo.set(n, value);
    return value;
  }
}

const asyncFibonacciLogger = async (limit) => {
  const fibonacci = new Fibonacci(limit);
  const sequence = fibonacci.generateSequence();
  
  for await (let num of sequence) {
    print(num);
    await new Promise(resolve => setTimeout(resolve, 100));  
  }

  print(`Memoized Fibonacci(10): ${fibonacci.memoizedFibonacci(10)}`);
};

(async () => {
  try {
    const limit = 10;
    await asyncFibonacciLogger(limit);
  } catch (error) {
    console.error('Error:', error);
  }
})();
