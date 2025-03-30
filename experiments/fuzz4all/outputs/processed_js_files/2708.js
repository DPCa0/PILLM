class Fibonacci {
  constructor(limit) {
    this.limit = limit;
    this.memo = new Map();
  }

  *generate() {
    let [a, b] = [0, 1];
    for (let i = 0; i < this.limit; i++) {
      yield a;
      [a, b] = [b, a + b];
    }
  }

  memoized(n) {
    if (this.memo.has(n)) return this.memo.get(n);
    if (n <= 1) return n;
    const result = this.memoized(n - 1) + this.memoized(n - 2);
    this.memo.set(n, result);
    return result;
  }

  static async asyncProcess(array) {
    const results = await Promise.all(array.map(async (num) => {
      await new Promise((resolve) => setTimeout(resolve, 50));  
      return num * num;
    }));
    return results;
  }
}

(async () => {
  const fib = new Fibonacci(10);
  print("Generated Fibonacci sequence:");
  for (const num of fib.generate()) {
    print(num);
  }

  print("\nMemoized Fibonacci value for n=10:");
  print(fib.memoized(10));

  print("\nAsync processing results:");
  const asyncResults = await Fibonacci.asyncProcess([1, 2, 3, 4, 5]);
  print(asyncResults);

  print("\nUsing Proxy for dynamic behavior:");
  const handler = {
    get(target, prop) {
      if (prop in target) return target[prop];
      return `Property ${prop} doesn't exist`;
    }
  };
  const proxy = new Proxy(fib, handler);
  print(proxy.limit); // 10
  print(proxy.nonExistent); // Property nonExistent doesn't exist
})();
