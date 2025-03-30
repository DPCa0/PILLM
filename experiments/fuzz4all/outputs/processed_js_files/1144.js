class Fibonacci {
  constructor(limit) {
    this.limit = limit;
    this.memo = new Map();
    this[Symbol.iterator] = this.iterator.bind(this);
  }

  *iterator() {
    let count = 0, a = 0, b = 1;
    while (count < this.limit) {
      yield a;
      [a, b] = [b, a + b];
      count++;
    }
  }

  nth(n) {
    if (n <= 1) return n;
    if (this.memo.has(n)) return this.memo.get(n);
    const value = this.nth(n - 1) + this.nth(n - 2);
    this.memo.set(n, value);
    return value;
  }

  async sumOfFibs() {
    const sum = Array.from(this).reduce((acc, num) => acc + num, 0);
    return new Promise(resolve => {
      setTimeout(() => resolve(sum), 200);
    });
  }
}

(async () => {
  const fib = new Fibonacci(10);
  print('Fibonacci Sequence:', [...fib]);
  print('6th Fibonacci Number:', fib.nth(6));
  const sum = await fib.sumOfFibs();
  print('Sum of Fibonacci Sequence:', sum);
})();
