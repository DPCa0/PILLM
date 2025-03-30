 
const memoize = (fn) => {
  const cache = new Map();
  return new Proxy(fn, {
    apply(target, thisArg, args) {
      const [n] = args;
      if (cache.has(n)) {
        print(`Fetching from cache for n=${n}`);
        return cache.get(n);
      }
      const result = target.apply(thisArg, args);
      cache.set(n, result);
      return result;
    }
  });
};

const fibonacci = memoize(function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
});

 
async function computeFibonacciAsync(n) {
  for (let i = 0; i <= n; i++) {
    print(`Fibonacci(${i}) = ${await new Promise(resolve => setTimeout(() => resolve(fibonacci(i)), 100))}`);
  }
}

 
const main = async () => {
  await Promise.all([
    computeFibonacciAsync(10),
    computeFibonacciAsync(5),
  ]);
  
  print("Fibonacci computations complete.");
};

 
(async () => {
  try {
    await main();
  } catch (error) {
    console.error("An error occurred:", error);
  }
})();
