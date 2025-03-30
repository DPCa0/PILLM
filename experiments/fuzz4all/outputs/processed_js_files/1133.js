 

 
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      print('Fetching from cache:', key);
      return cache.get(key);
    }
    print('Calculating result for:', key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

 
const fibonacci = memoize((n, a = 1, b = 1) => {
  if (n <= 1) return a;
  return fibonacci(n - 1, b, a + b);
});

 
const asyncFibonacciDemo = async (n) => {
  print(`Calculating Fibonacci for ${n}`);
  await wait(1000);
  const result = fibonacci(n);
  print(`Fibonacci(${n}): ${result}`);
};

 
const uniqueArray = (arr) => [...new Set(arr)];

(async () => {
  print('Unique values:', uniqueArray([1, 2, 3, 1, 2, 4]));
  await asyncFibonacciDemo(10);
  await asyncFibonacciDemo(10);   
})();
