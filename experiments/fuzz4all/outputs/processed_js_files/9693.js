const axios = require('axios');
const { performance } = require('perf_hooks');

async function fetchData(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

function* createIDGenerator(start) {
  let id = start;
  while (true) {
    yield id++;
  }
}

function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (!cache.has(key)) {
      cache.set(key, fn(...args));
    }
    return cache.get(key);
  };
}

const idGenerator = createIDGenerator(1);
const fibonacci = memoize(n => (n <= 1 ? n : fibonacci(n - 1) + fibonacci(n - 2)));

async function main() {
  const startTime = performance.now();

  const data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
  if (data) {
    print('Fetched Data:', data);
  }

  print('Generating IDs:');
  print('ID 1:', idGenerator.next().value);
  print('ID 2:', idGenerator.next().value);

  print('Calculating Fibonacci:');
  print('Fib(10):', fibonacci(10));
  print('Fib(15):', fibonacci(15));

  const endTime = performance.now();
  print(`Execution time: ${(endTime - startTime).toFixed(2)}ms`);
}

main();
