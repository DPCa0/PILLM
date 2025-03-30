class Fibonacci {
  constructor() {
    this.memo = new Map();
  }

  *generate(limit) {
    let [a, b] = [0, 1];
    while (limit--) {
      yield a;
      [a, b] = [b, a + b];
    }
  }

  memoized(n) {
    if (this.memo.has(n)) return this.memo.get(n);
    if (n <= 1) return n;
    let result = this.memoized(n - 1) + this.memoized(n - 2);
    this.memo.set(n, result);
    return result;
  }
}

const fib = new Fibonacci();
print([...fib.generate(10)]);

const asyncOp = () => new Promise(resolve => setTimeout(() => resolve('Done'), 1000));

(async () => {
  print('Before async operation');
  const result = await asyncOp();
  print(result);
  print('After async operation');

  const nums = [1, 2, 3, 4, 5];
  const [head, ...tail] = nums;
  print(head, tail);

  const obj = { a: 1, b: 2 };
  const objWithSpread = { ...obj, c: 3 };
  print(objWithSpread);

  const results = [0, 1, 2, 3, 4, 5].map(num => fib.memoized(num));
  print(results);
})();
