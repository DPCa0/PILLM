class Fibonacci {
  constructor(limit) {
    this.limit = limit;
    this.memo = new Map();
  }

  *[Symbol.iterator]() {
    let [a, b, n] = [0, 1, 0];
    while (n < this.limit) {
      yield a;
      [a, b] = [b, a + b];
      n++;
    }
  }

  memoizedFib(n) {
    if (n < 2) return n;
    if (this.memo.has(n)) return this.memo.get(n);
    let result = this.memoizedFib(n - 1) + this.memoizedFib(n - 2);
    this.memo.set(n, result);
    return result;
  }
}

const fibGen = new Fibonacci(10);
print("Generated Fibonacci Series:");
for (const num of fibGen) {
  print(num);
}

print("\nMemoized Fibonacci (up to 10):");
[...Array(11).keys()].forEach(n => print(fibGen.memoizedFib(n)));

const asyncOperation = async () => {
  return new Promise(resolve => setTimeout(() => resolve('Async operation complete!'), 1000));
};

(async () => {
  print("\nAwaiting async operation...");
  const result = await asyncOperation();
  print(result);
})();

const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve) => setTimeout(resolve, 2000, 'foo'));

Promise.all([promise1, promise2, promise3]).then(values => {
  print("\nPromise.all resolved values:");
  print(values);
});
