class AsyncCache {
  constructor() {
    this.cache = new Map();
  }

  async fetchData(key, asyncFunc) {
    if (this.cache.has(key)) {
      return this.cache.get(key);
    } else {
      const promise = asyncFunc();
      this.cache.set(key, promise);
      try {
        const result = await promise;
        this.cache.set(key, result);
        return result;
      } catch (error) {
        this.cache.delete(key);
        throw error;
      }
    }
  }
}

function fibonacciAsync(n, cache = new Map()) {
  if (cache.has(n)) return Promise.resolve(cache.get(n));
  if (n <= 1) return Promise.resolve(n);

  const promise = (async () => {
    const a = await fibonacciAsync(n - 1, cache);
    const b = await fibonacciAsync(n - 2, cache);
    const result = a + b;
    cache.set(n, result);
    return result;
  })();

  cache.set(n, promise);
  return promise;
}

(async () => {
  const asyncCache = new AsyncCache();

  try {
    const fib10 = await asyncCache.fetchData(10, () => fibonacciAsync(10));
    print(`Fibonacci(10): ${fib10}`);

    const fib20 = await asyncCache.fetchData(20, () => fibonacciAsync(20));
    print(`Fibonacci(20): ${fib20}`);

     
    const fib10Again = await asyncCache.fetchData(10, () => fibonacciAsync(10));
    print(`Fibonacci(10) again: ${fib10Again}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
})();
