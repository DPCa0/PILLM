class Fibonacci {
  constructor() {
    this.memo = new Map();
  }

  *[Symbol.iterator]() {
    let [prev, curr] = [0, 1];
    while (true) {
      yield curr;
      [prev, curr] = [curr, prev + curr];
    }
  }

  calculate(n) {
    if (this.memo.has(n)) return this.memo.get(n);
    if (n <= 1) return n;
    const result = this.calculate(n - 1) + this.calculate(n - 2);
    this.memo.set(n, result);
    return result;
  }
}

const fibonacci = new Fibonacci();

const asyncFibonacciSum = async (limit) => {
  const iter = fibonacci[Symbol.iterator]();
  let sum = 0;
  for (let i = 0; i < limit; i++) {
    sum += iter.next().value;
    await new Promise((resolve) => setTimeout(resolve, 10));  
  }
  return sum;
};

(async () => {
  try {
    const sum = await asyncFibonacciSum(10);
    print(`Sum of first 10 Fibonacci numbers: ${sum}`);
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
