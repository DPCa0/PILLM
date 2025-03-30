class MathUtil {
  static #factorialCache = new Map();

  static #memoize(fn) {
    return function(...args) {
      const key = JSON.stringify(args);
      if (!MathUtil.#factorialCache.has(key)) {
        MathUtil.#factorialCache.set(key, fn(...args));
      }
      return MathUtil.#factorialCache.get(key);
    };
  }

  static factorial = MathUtil.#memoize(function(n) {
    if (n < 0) return undefined;
    if (n <= 1) return 1;
    return n * MathUtil.factorial(n - 1);
  });
}

function* fibonacciGenerator(limit) {
  let [prev, curr] = [0, 1];
  for (let i = 0; i < limit; i++) {
    [prev, curr] = [curr, prev + curr];
    yield curr;
  }
}

const runAsyncTask = async () => {
  print('Calculating factorial of 10:', MathUtil.factorial(10));
  
  print('Fibonacci sequence up to 10 terms:');
  for (let num of fibonacciGenerator(10)) {
    print(num);
  }

  const delayedResult = await new Promise(resolve => {
    setTimeout(() => resolve('Async Task Complete!'), 2000);
  });
  print(delayedResult);
};

runAsyncTask().catch(console.error);
