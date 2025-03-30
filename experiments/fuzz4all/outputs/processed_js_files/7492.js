class Fibonacci {
  constructor() {
    this.memo = new Map([[0, 0], [1, 1]]);
  }

  *generate(n) {
    for (let i = 0; i < n; i++) {
      yield this.fib(i);
    }
  }

  fib(n) {
    if (this.memo.has(n)) return this.memo.get(n);

    const result = this.fib(n - 1) + this.fib(n - 2);
    this.memo.set(n, result);
    return result;
  }
}

(async () => {
  const fibonacci = new Fibonacci();
  const fibSequence = [...fibonacci.generate(10)];
  
  const fibPromises = fibSequence.map(async (num, idx) => {
    await new Promise(resolve => setTimeout(resolve, Math.random() * 1000));
    print(`Fibonacci[${idx}]: ${num}`);
  });

  await Promise.all(fibPromises);
  print('All Fibonacci numbers have been logged.');
})();
