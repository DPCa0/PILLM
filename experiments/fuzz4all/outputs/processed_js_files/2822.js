class FetchError extends Error {
  constructor(message, response) {
    super(message);
    this.name = 'FetchError';
    this.response = response;
  }
}

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new FetchError('Failed to fetch data', response);
  return response.json();
}

function debounce(fn, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

const fibonacci = (function () {
  const memo = new Map();
  function fib(n) {
    if (n <= 1) return n;
    if (memo.has(n)) return memo.get(n);
    const value = fib(n - 1) + fib(n - 2);
    memo.set(n, value);
    return value;
  }
  return fib;
})();

(async () => {
  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/posts');
    print('Fetched Data:', data.slice(0, 3));

    const debouncedLog = debounce(console.log, 1000);
    debouncedLog('This is debounced!');
    
    print('Fibonacci(10):', fibonacci(10));
  } catch (error) {
    if (error instanceof FetchError) {
      console.error('FetchError:', error.message, 'Status:', error.response.status);
    } else {
      console.error('An error occurred:', error.message);
    }
  }
})();
