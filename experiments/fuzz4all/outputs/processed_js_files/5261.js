class Fibonacci {
  #memo = new Map([[0, 0], [1, 1]]);
  
  get(n) {
    if (this.#memo.has(n)) return this.#memo.get(n);
    const value = this.get(n - 1) + this.get(n - 2);
    this.#memo.set(n, value);
    return value;
  }
}

function* take(iterable, count) {
  for (const x of iterable) {
    if (count-- <= 0) return;
    yield x;
  }
}

async function* asyncFibonacci(n) {
  const fib = new Fibonacci();
  for (let i = 0; i <= n; i++) {
    yield new Promise(resolve => 
      setTimeout(() => resolve(fib.get(i)), 100)
    );
  }
}

(async () => {
  for await (const num of take(asyncFibonacci(10), 8)) {
    print(num);
  }
})();
