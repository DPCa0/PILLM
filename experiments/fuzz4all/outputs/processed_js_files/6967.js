 
import { readFile } from 'fs/promises';

 
async function readJSONFile(filePath) {
  const data = await readFile(filePath, 'utf-8');
  return JSON.parse(data);
}

 
class FibonacciSequence {
  constructor(limit) {
    this.limit = limit;
  }
  
  *[Symbol.iterator]() {
    let a = 0, b = 1;
    for (let i = 0; i < this.limit; i++) {
      yield a;
      [a, b] = [b, a + b];
    }
  }
}

 
const targetObject = { name: 'Alice', age: 30 };
const handler = {
  get: (obj, prop) => {
    print(`Getting ${prop}`);
    return prop in obj ? obj[prop] : 'Property not found';
  },
  set: (obj, prop, value) => {
    print(`Setting ${prop} to ${value}`);
    obj[prop] = value;
    return true;
  }
};

const proxy = new Proxy(targetObject, handler);

 
(async () => {
   
  print('Reading JSON file...');
  try {
    const config = await readJSONFile('./config.json');  
    print('Config:', config);
  } catch (error) {
    console.error('Error reading file:', error);
  }
  
   
  print('Fibonacci Sequence:');
  for (const num of new FibonacciSequence(10)) {
    print(num);
  }

   
  print(proxy.name);
  proxy.age = 31;
  print(proxy.age);
})();
