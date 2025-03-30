 
const timeExecution = (fn, ...args) => {
  const start = performance.now();
  const result = fn(...args);
  const end = performance.now();
  return { result, time: end - start };
};

 
const handler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Getting ${prop}`);
      return target[prop];
    }
    return `No property ${prop} found`;
  },
  set: (target, prop, value) => {
    print(`Setting ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
};

const targetObject = { a: 1, b: 2 };
const proxy = new Proxy(targetObject, handler);

 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetching error:', error);
  }
};

 
const uniqueValues = new Set([1, 2, 3, 3, 4]);

 
const mapValues = new Map();
mapValues.set('double', (x) => x * 2);
mapValues.set('triple', (x) => x * 3);

const applyMapFunction = (fnKey, value) => {
  const fn = mapValues.get(fnKey);
  return fn ? fn(value) : 'Function not found';
};

 
print(timeExecution(Math.max, 1, 3, 5, 7));  
proxy.a = 10;  
print(proxy.a);
print(proxy.c);

fetchData('https://jsonplaceholder.typicode.com/todos/1').then((data) =>
  console.log('Fetched Data:', data)
);  

print(uniqueValues);  
print(applyMapFunction('double', 5));  
