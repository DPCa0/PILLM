class Fibonacci {
  constructor(limit) {
    this.limit = limit;
    this.memo = new Proxy({}, {
      get: (target, prop) => prop in target ? target[prop] : target[prop] = this.calculate(Number(prop))
    });
  }

  calculate(n) {
    if (n <= 1) return n;
    return this.memo[n - 1] + this.memo[n - 2];
  }

  *[Symbol.iterator]() {
    for (let i = 0; i < this.limit; i++) {
      yield this.memo[i];
    }
  }
}

const fibonacciSequence = new Fibonacci(10);

const asyncLog = async (iterable) => {
  for await (const num of iterable) {
    await new Promise(resolve => setTimeout(resolve, 500));
    print(num);
  }
};

asyncLog(fibonacciSequence);
