class Fibonacci {
  #memo = new Map();

  calculate(n) {
    if (n <= 1) return n;
    if (this.#memo.has(n)) return this.#memo.get(n);
    
    const result = this.calculate(n - 1) + this.calculate(n - 2);
    this.#memo.set(n, result);
    return result;
  }
}

const fibonacci = new Fibonacci();
const max = 10;
const results = Array.from({ length: max }, (_, i) => fibonacci.calculate(i));

(async () => {
  const delays = results.map(num => new Promise(resolve => setTimeout(() => {
    print(`Fibonacci(${num})`);
    resolve();
  }, num * 100)));

  await Promise.all(delays);
  print('Fibonacci sequence calculation complete.');
})();
