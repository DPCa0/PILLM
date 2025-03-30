 
const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      print('Fetching from cache:', args);
      return cache.get(key);
    }
    print('Calculating result for:', args);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

 
const fibonacci = memoize((n) => {
  if (n < 2) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

 
const calculateFibonacciAsync = async (num) => {
  print(`Starting async computation for Fibonacci(${num})`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fibonacci(num));
    }, 1000);  
  });
};

 
(async () => {
  try {
    const numbers = [10, 20, 10, 30];
    const results = await Promise.all(numbers.map(async (num) => {
      const result = await calculateFibonacciAsync(num);
      print(`Fibonacci(${num}) = ${result}`);
      return { num, result };
    }));

     
    for (const { num, result } of results) {
      print(`Result: Fibonacci(${num}) = ${result}`);
    }
  } catch (error) {
    console.error('Error calculating Fibonacci:', error);
  }
})();
