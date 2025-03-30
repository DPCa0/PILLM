 
async function fetchData(url) {
   
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
   
  return response.json();
}

 
function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      print('Fetching from cache:', key);
      return cache.get(key);
    }
    print('Computing result for:', key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

 
const handler = {
  get(target, property) {
    if (property in target) {
      print(`Getting ${property}...`);
      return target[property];
    }
    print(`Property ${property} does not exist`);
    return null;
  },
  set(target, property, value) {
    print(`Setting ${property} to ${value}...`);
    target[property] = value;
    return true;
  }
};

 
const proxyObject = new Proxy({ foo: 42 }, handler);

 
(async () => {
  try {
     
    const dataUrl = 'https://jsonplaceholder.typicode.com/todos/1';

     
    const data = await fetchData(dataUrl);
    print('Fetched Data:', data);

     
    const slowFunction = (num) => {
      for (let i = 0; i < 1e9; i++) {}  
      return num * num;
    };
    const memoizedSlowFunction = memoize(slowFunction);
    print(memoizedSlowFunction(5));  
    print(memoizedSlowFunction(5));  

     
    print(proxyObject.foo);
    proxyObject.foo = 100;
    print(proxyObject.foo);
    print(proxyObject.bar);

  } catch (error) {
    console