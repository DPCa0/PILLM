class Fibonacci {
  constructor() {
    this.memo = new Map();
  }

  *[Symbol.iterator]() {
    let [a, b] = [0, 1];
    while (true) {
      yield a;
      [a, b] = [b, a + b];
    }
  }

  memoized(n) {
    if (n <= 1) return n;
    if (this.memo.has(n)) return this.memo.get(n);
    
    const result = this.memoized(n - 1) + this.memoized(n - 2);
    this.memo.set(n, result);
    return result;
  }
}

const fib = new Fibonacci();
const fibSequence = fib[Symbol.iterator]();

const first10Fib = Array.from({ length: 10 }, () => fibSequence.next().value);
print("First 10 Fibonacci numbers:", first10Fib);

const tenthFibMemo = fib.memoized(10);
print("10th Fibonacci number using memoization:", tenthFibMemo);

const logAsync = async (message, delay) => {
  await new Promise(resolve => setTimeout(resolve, delay));
  print(message);
};

(async () => {
  await Promise.all([
    logAsync("Async message 1", 2000),
    logAsync("Async message 2", 1000),
    logAsync("Async message 3", 1500)
  ]);
})();
