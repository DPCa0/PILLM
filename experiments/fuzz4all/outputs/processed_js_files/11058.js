 
import fetch from 'node-fetch';

 
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    print(data);
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

 
const handler = {
  get: (target, prop, receiver) => {
    print(`Property '${prop}' has been accessed`);
    return Reflect.get(target, prop, receiver);
  },
  set: (target, prop, value) => {
    print(`Property '${prop}' set to ${value}`);
    return Reflect.set(target, prop, value);
  }
};

const observedObject = new Proxy({ foo: 42 }, handler);

 
function* generator() {
  yield 1;
  yield 2;
  yield 3;
}

const iterableObject = {
  [Symbol.iterator]: generator
};

for (const value of iterableObject) {
  print(value);  
}

 
async function runConcurrentTasks() {
  const urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2'
  ];

  const fetchPromises = urls.map(url => fetchData(url));
  await Promise.all(fetchPromises);
}

runConcurrentTasks();

 
observedObject.foo = 100;   
print(observedObject.foo);   
