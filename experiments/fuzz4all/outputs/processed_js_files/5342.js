 
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

 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

 
const createCounter = (() => {
  let count = 0;
  return () => {
    count += 1;
    return count;
  };
})();

 
const dataHandler = {
  set(target, property, value) {
    print(`Property ${property} set to ${value}`);
    target[property] = value;
    return true;
  },
};
const data = new Proxy({}, dataHandler);

 
function* fibonacciGenerator() {
  let [prev, curr] = [0, 1];
  while (true) {
    [prev, curr] = [curr, prev + curr];
    yield curr;
  }
}

const fib = fibonacciGenerator();
print(fib.next().value);  
print(fib.next().value);  
print(fib.next().value);  
print(fib.next().value);  

 
const highlight = (strings, ...values) => {
  return strings.reduce((result, str, i) => `${result}${str}<b>${values[i] || ''}</b>`, '');
};

const name = 'World';
print(highlight`Hello, ${name}! Welcome to advanced JavaScript.`);

 
(async () => {
  const memoizedFetchData = memoize(fetchData);

  try {
    const url = 'https://jsonplaceholder.typicode.com/posts/1';
    const result1 = await memoizedFetchData(url);
    console.log('