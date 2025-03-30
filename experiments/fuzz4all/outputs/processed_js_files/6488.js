class Fibonacci {
  constructor(max) {
    this.max = max;
    this.memo = new Map();
    this.memo.set(0, 0);
    this.memo.set(1, 1);
  }

  *generator() {
    let [a, b] = [0, 1];
    while (a <= this.max) {
      yield a;
      [a, b] = [b, a + b];
    }
  }

  calculate(n) {
    if (this.memo.has(n)) return this.memo.get(n);
    const value = this.calculate(n - 1) + this.calculate(n - 2);
    this.memo.set(n, value);
    return value;
  }
}

(async () => {
  const maxNumber = 50;
  const fib = new Fibonacci(maxNumber);

  print("Fibonacci series up to", maxNumber, ":");
  for (const num of fib.generator()) {
    print(num);
  }

  print("\nFibonacci numbers calculated asynchronously:");
  const fibNumbers = await Promise.all(
    Array.from({ length: 10 }, (_, i) => i)
      .map(i => 
        new Promise(resolve => 
          setTimeout(() => 
            resolve(`Fib(${i}) = ${fib.calculate(i)}`), 
            Math.random() * 1000)
        )
      )
  );

  fibNumbers.forEach(console.log);
})();
