 
import { createInterface } from 'readline';
import { promisify } from 'util';
import fetch from 'node-fetch';

 
async function fetchAndLog(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    print('Fetched Data:', data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
const fibonacci = (function() {
  const memo = {};
  return function fib(n) {
    if (n in memo) return memo[n];
    if (n <= 1) return n;
    return memo[n] = fib(n - 1) + fib(n - 2);
  };
})();

 
const target = { message: 'Hello, Proxy!' };
const handler = {
  get: (obj, prop) => {
    print(`Accessed property "${prop}"`);
    return obj[prop];
  }
};
const proxy = new Proxy(target, handler);

 
async function* asyncGenerator(max) {
  for (let i = 1; i <= max; i++) {
    await new Promise(resolve => setTimeout(resolve, 100));  
    yield i;
  }
}

(async () => {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const question = promisify(rl.question).bind(rl);

   
  try {
    const url = await question('Enter a URL to fetch: ');
    await fetchAndLog(url);

    print('Fibonacci of 10:', fibonacci(10));

    print('Using Proxy:');
    print(proxy.message);

    print('Async iteration results:');
    for await (const num of asyncGenerator(5)) {
      print(num);
    }
  } finally {
    rl.close();
  }
})();
