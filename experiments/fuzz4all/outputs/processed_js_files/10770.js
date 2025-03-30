class Fibonacci {
  constructor(limit) {
    this.limit = limit;
    this.cache = new Proxy({}, {
      get: (obj, prop) => (prop in obj ? obj[prop] : undefined),
      set: (obj, prop, value) => {
        if (Object.keys(obj).length < this.limit) {
          obj[prop] = value;
        }
        return true;
      }
    });
  }

  *sequence() {
    let [a, b] = [0, 1];
    while (this.limit--) {
      yield a;
      [a, b] = [b, a + b];
    }
  }

  async calcFibonacci(n) {
    if (this.cache[n] !== undefined) {
      return Promise.resolve(this.cache[n]);
    }
    if (n < 2) return n;
    let value = await this.calcFibonacci(n - 1) + await this.calcFibonacci(n - 2);
    this.cache[n] = value;
    return value;
  }
}

(async () => {
  const fib = new Fibonacci(10);
  print('Fibonacci Sequence:');
  for (let num of fib.sequence()) {
    print(num);
  }
  
  print('Calculating Fibonacci for specific numbers using cache:');
  print(`Fibonacci(7): ${await fib.calcFibonacci(7)}`);
  print(`Fibonacci(9): ${await fib.calcFibonacci(9)}`);
})();
