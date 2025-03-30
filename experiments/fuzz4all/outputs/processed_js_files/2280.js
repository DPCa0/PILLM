class Fibonacci {
  constructor() {
    this.memo = new Map();
  }

  get(n) {
    if (n <= 1) return n;
    if (this.memo.has(n)) return this.memo.get(n);

    const result = this.get(n - 1) + this.get(n - 2);
    this.memo.set(n, result);
    return result;
  }
}

async function* asyncFibonacci(n) {
  const fib = new Fibonacci();
  for (let i = 0; i <= n; i++) {
    await new Promise(resolve => setTimeout(resolve, 100));  
    yield fib.get(i);
  }
}

(async () => {
  try {
    const maxNum = 10;
    const results = [];
    for await (const num of asyncFibonacci(maxNum)) {
      results.push(num);
    }
    print(`Fibonacci sequence up to ${maxNum}:`, results);
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
