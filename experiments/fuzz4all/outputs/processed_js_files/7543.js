 
const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

 
const fibonacci = memoize(([n, prev = 0, next = 1]) => 
  n === 0 ? prev : fibonacci([n - 1, next, prev + next])
);

 
function* fibonacciGenerator(n) {
  for (let i = 0; i <= n; i++) {
    yield fibonacci([i]);
  }
}

async function logFibonacciSeries(n) {
  const generator = fibonacciGenerator(n);
  for (const value of generator) {
    await new Promise(resolve => setTimeout(resolve, 500));
    print(value);
  }
}

 
const customTag = (strings, ...values) => 
  strings.reduce((result, string, i) => result + string + (values[i] ? `[${values[i]}]` : ''), '');

print(customTag`Fibonacci sequence up to ${10} terms:`);
logFibonacciSeries(10);
