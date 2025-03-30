class FibonacciSequence {
  constructor(limit) {
    this.limit = limit;
    this[Symbol.iterator] = function* () {
      let a = 0, b = 1;
      while (a <= this.limit) {
        yield a;
        [a, b] = [b, a + b];
      }
    }
  }
}

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

(async () => {
  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/posts');
    print('Fetched Data:', data.slice(0, 3));
  } catch (error) {
    console.error('Fetching error:', error);
  }
})();

const memoizedFactorial = (function () {
  const cache = {};
  return function factorial(n) {
    if (n in cache) return cache[n];
    if (n <= 1) return 1;
    return cache[n] = n * factorial(n - 1);
  }
})();

const fibonacci = new FibonacciSequence(100);
print('Fibonacci Sequence up to 100:', [...fibonacci]);

print('Factorial of 5:', memoizedFactorial(5));
print('Factorial of 10:', memoizedFactorial(10));

const logger = new Proxy(console.log, {
  apply(target, thisArg, args) {
    args = args.map(arg => `[LOG]: ${arg}`);
    return Reflect.apply(target, thisArg, args);
  }
});

logger('This is a custom log message.');
