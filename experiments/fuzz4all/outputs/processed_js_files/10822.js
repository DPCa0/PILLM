 
import fs from 'fs/promises';
import EventEmitter from 'events';

 
class MyEmitter extends EventEmitter {}

 
async function processFiles() {
  try {
    const data = await fs.readFile('./input.txt', 'utf-8');
    const transformedData = transformData(data);
    await fs.writeFile('./output.txt', transformedData);
  } catch (error) {
    console.error('Error processing files:', error);
  }
}

 
function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

 
const transformData = memoize((data) => {
  return data.toUpperCase().split('').reverse().join('');
});

 
const handler = {
  get(target, property) {
    print(`Property ${property} accessed`);
    return target[property];
  },
};

const targetObject = { message: 'Hello, Proxy!' };
const proxyObject = new Proxy(targetObject, handler);

 
const emitter = new MyEmitter();

 
emitter.on('start', async () => {
  print('Processing started...');
  await processFiles();
  print('Processing completed!');
});

 
emitter.emit('start');

 
print(proxyObject.message);
