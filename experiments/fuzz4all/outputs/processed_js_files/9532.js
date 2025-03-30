 

 
export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
export const fibonacci = (function() {
  const cache = {};
  return n => {
    if (n in cache) return cache[n];
    if (n <= 1) return n;
    return cache[n] = fibonacci(n - 1) + fibonacci(n - 2);
  };
})();

 
import { delay, fibonacci } from './utility.js';

 
const handler = {
  get: function(target, propKey, receiver) {
    const origMethod = target[propKey];
    return function(...args) {
      print(`Calling ${propKey} with args:`, args);
      return origMethod.apply(this, args);
    };
  }
};

const methods = {
  async fetchData(url) {
    const response = await fetch(url);
    return response.json();
  },
  calculateFib(n) {
    return fibonacci(n);
  }
};

const proxyMethods = new Proxy(methods, handler);

(async () => {
  print('Fetching data...');
  try {
    const data = await proxyMethods.fetchData('https://jsonplaceholder.typicode.com/posts/1');
    print('Data fetched:', data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  print('Calculating Fibonacci...');
  const n = 10;
  print(`Fibonacci of ${n} is`, proxyMethods.calculateFib(n));

  print('Using Symbols...');
  const sym1 = Symbol('unique1');
  const sym2 = Symbol('unique2');
  const obj = {
    [sym1]: 'value1',
    [sym2]: 'value2',
    regularProp: 'I am regular'
  };
  print('Object with Symbols:', obj);
  print('Accessing Symbol properties:', obj[sym1], obj[sym2]);
})();
