class Fibonacci {
  constructor() {
    this.memo = new Proxy({}, {
      get: (target, name) => name in target ? target[name] : this._compute(name)
    });
  }

  _compute(n) {
    if (n < 2) return n;
    return this.memo[n - 1] + this.memo[n - 2];
  }

  get(n) {
    return this.memo[n];
  }
}

const asyncFibonacci = async n => {
  if (typeof n !== 'number' || n < 0) throw new Error('Input must be a non-negative number');
  const fib = new Fibonacci();
  print(`Fibonacci of ${n}: ${fib.get(n)}`);
};

const numbers = Array.from({ length: 10 }, (_, i) => i);
const promises = numbers.map(num => asyncFibonacci(num));

Promise.all(promises)
  .then(() => console.log('All calculations are done'))
  .catch(error => console.error('An error occurred:', error));
