 
import fs from 'fs/promises';

 
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Fetching data failed:', error);
    throw error;
  }
}

 
function createCounter() {
  let count = 0;
  return {
    increment: () => ++count,
    decrement: () => --count,
    value: () => count,
  };
}

 
const logger = {
  log: [],
};

const handler = {
  get: function(target, property) {
    print(`Getting ${property}`);
    target.log.push(`Getting ${property}`);
    return Reflect.get(...arguments);
  },
  set: function(target, property, value) {
    print(`Setting ${property} to ${value}`);
    target.log.push(`Setting ${property} to ${value}`);
    return Reflect.set(...arguments);
  },
};

const proxyLogger = new Proxy(logger, handler);

 
async function performOperations() {
  const counter = createCounter();

  const operations = [
    fetchData('https://jsonplaceholder.typicode.com/todos/1'),
    fetchData('https://jsonplaceholder.typicode.com/todos/2'),
    new Promise(resolve => setTimeout(() => resolve(counter.increment()), 1000)),
    new Promise(resolve => setTimeout(() => resolve(counter.increment()), 2000)),
  ];

  const results = await Promise.all(operations);
  print('Results:', results);
  print('Counter value:', counter.value());

  proxyLogger.newProperty = 'Hello, Proxy!';
  print('Proxy log:', proxyLogger.log);

  await fs.writeFile('log.txt', JSON.stringify(proxyLogger.log, null, 2));
}

performOperations().catch(console.error);
