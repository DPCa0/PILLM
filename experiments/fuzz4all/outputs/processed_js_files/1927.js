class Fibonacci {
  constructor(limit) {
    this.limit = limit;
    this.memo = new Map();
  }
  
  *generator() {
    let [a, b] = [0, 1];
    while (a <= this.limit) {
      yield a;
      [a, b] = [b, a + b];
    }
  }

  async calculateAsync(n) {
    if (this.memo.has(n)) return this.memo.get(n);
    if (n < 2) return n;
    let result = await Promise.all([this.calculateAsync(n - 1), this.calculateAsync(n - 2)]);
    let value = result[0] + result[1];
    this.memo.set(n, value);
    return value;
  }
}

(async () => {
  const fibLimit = 50;
  const fib = new Fibonacci(fibLimit);

  print(`Fibonacci sequence up to ${fibLimit}:`);
  for (let number of fib.generator()) {
    print(number);
  }

  const fibNumber = 10;
  let result = await fib.calculateAsync(fibNumber);
  print(`\n${fibNumber}th Fibonacci number (calculated asynchronously): ${result}`);
})();
