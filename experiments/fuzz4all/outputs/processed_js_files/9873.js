class FibonacciSequence {
  constructor(limit) {
    this.limit = limit;
    this.cache = new Map();
  }

  *[Symbol.iterator]() {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < this.limit; i++) {
      yield curr;
      [prev, curr] = [curr, prev + curr];
    }
  }

  memoizedFibonacci(n) {
    if (n < 2) return n;
    if (this.cache.has(n)) return this.cache.get(n);
    
    const result = this.memoizedFibonacci(n - 1) + this.memoizedFibonacci(n - 2);
    this.cache.set(n, result);
    return result;
  }
}

const asyncTask = (number) => new Promise((resolve) => {
  setTimeout(() => {
    resolve(`Task complete: ${number}`);
  }, 1000);
});

const runAsyncTasks = async (sequence) => {
  for await (const num of sequence) {
    const result = await asyncTask(num);
    print(result);
  }
};

const fibonacciSequence = new FibonacciSequence(10);

print("Fibonacci Sequence:");
for (const num of fibonacciSequence) {
  print(num);
}

print("\nMemoized Fibonacci (9):");
print(fibonacciSequence.memoizedFibonacci(9));

print("\nRunning Async Tasks:");
runAsyncTasks(fibonacciSequence);
