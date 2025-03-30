class FibonacciGenerator {
  constructor() {
    this.memo = new Map([[0, 0], [1, 1]]);
  }

  *[Symbol.iterator]() {
    let index = 0;
    while (true) {
      yield this.fib(index++);
    }
  }

  fib(n) {
    if (this.memo.has(n)) {
      return this.memo.get(n);
    }
    const value = this.fib(n - 1) + this.fib(n - 2);
    this.memo.set(n, value);
    return value;
  }
}

const fibonacciGenerator = new FibonacciGenerator();
const fibonacciArray = Array.from({ length: 10 }, (_, i) => fibonacciGenerator.fib(i));

const asyncOperation = async () => {
  const delayedExecution = ms => new Promise(resolve => setTimeout(resolve, ms));
  await delayedExecution(1000);
  print("Fibonacci Sequence:", fibonacciArray);
};

(async () => {
  try {
    await asyncOperation();
    const [a, ...rest] = fibonacciArray;
    const filtered = rest.filter(n => n % 2 === 0);
    print("Filtered Evens:", filtered);

    const sum = filtered.reduce((acc, num) => acc + num, 0);
    print("Sum of Evens:", sum);
  } catch (error) {
    console.error("Error:", error);
  }
})();
