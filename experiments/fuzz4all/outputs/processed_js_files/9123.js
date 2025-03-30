 
const memoize = (fn) => {
  const cache = new Map();
  return (n) => {
    if (cache.has(n)) {
      return cache.get(n);
    }
    const result = fn(n);
    cache.set(n, result);
    return result;
  };
};

const fibonacci = memoize((n) => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

 
const handler = {
  apply: (target, thisArg, argumentsList) => {
    print(`Calculating Fibonacci of ${argumentsList[0]}`);
    return target(...argumentsList);
  },
};

const proxiedFibonacci = new Proxy(fibonacci, handler);

 
const asyncFibonacci = async (n) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(proxiedFibonacci(n)), 1000);
  });
};

 
(async () => {
  print("Start calculating Fibonacci sequence:");
  for (let i = 0; i <= 10; i++) {
    const result = await asyncFibonacci(i);
    print(`Fibonacci(${i}) = ${result}`);
  }
})();
