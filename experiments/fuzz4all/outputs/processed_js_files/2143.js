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

  async calculate(n) {
    if (n <= 1) return n;
    if (this.memo.has(n)) return this.memo.get(n);

    const result = await Promise.all([this.calculate(n - 1), this.calculate(n - 2)]);
    const fib = result[0] + result[1];
    this.memo.set(n, fib);
    return fib;
  }
}

(async () => {
  const fib = new Fibonacci();
  print("Fibonacci Sequence:");
  const iter = fib[Symbol.iterator]();
  
   
  for (const num of iter) {
    print(num);
    if (num > 50) break;
  }

   
  const nthFib = 10;
  const fibNum = await fib.calculate(nthFib);
  print(`Fibonacci number at position ${nthFib} is: ${fibNum}`);
})();
