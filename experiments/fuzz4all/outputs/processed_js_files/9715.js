class Fibonacci {
  constructor() {
    this.memo = new Map();
  }

  *sequence(n) {
    for (let i = 0; i < n; i++) {
      yield this.fib(i);
    }
  }

  fib(n) {
    if (n <= 1) return n;
    if (this.memo.has(n)) return this.memo.get(n);
    
    const result = this.fib(n - 1) + this.fib(n - 2);
    this.memo.set(n, result);
    return result;
  }
}

const fibonacci = new Fibonacci();

(async function() {
  const iterator = fibonacci.sequence(10);
  
  for await (let num of iterator) {
    const double = await new Promise(resolve => setTimeout(() => resolve(num * 2), 100));
    print(double);
  }
})();
