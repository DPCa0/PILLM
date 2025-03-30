class Fibonacci {
  constructor(limit) {
    this.limit = limit;
    this.memo = new Proxy({}, {
      get: (obj, prop) => (prop in obj ? obj[prop] : undefined)
    });
  }

  *[Symbol.iterator]() {
    let a = 0, b = 1, i = 0;
    while (i++ < this.limit) {
      yield a;
      [a, b] = [b, a + b];
    }
  }

  calculate(n) {
    if (n in this.memo) return this.memo[n];
    if (n <= 1) return n;
    this.memo[n] = this.calculate(n - 1) + this.calculate(n - 2);
    return this.memo[n];
  }

  static async fetchFibonacciNumber(n) {
    const fib = new Fibonacci(n);
    return fib.calculate(n);
  }
}

const fibSequence = new Fibonacci(10);
print([...fibSequence]);

Fibonacci.fetchFibonacciNumber(10).then(result => print(`Fibonacci(10): ${result}`));

const asyncFunction = async () => {
  let sum = 0;
  for await (let num of fibSequence) {
    sum += num;
  }
  print(`Sum of Fibonacci Sequence: ${sum}`);
};

asyncFunction();
