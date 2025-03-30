 
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fs = require('fs');

 
async function* readFileAsync(filePath) {
  const fileStream = fs.createReadStream(filePath, { encoding: 'utf-8' });
  let buffer = '';
  for await (const chunk of fileStream) {
    buffer += chunk;
    let lines = buffer.split('\n');
    buffer = lines.pop();
    for (const line of lines) {
      yield line;
    }
  }
  if (buffer) yield buffer;
}

 
const handler = {
  get: (target, prop) => {
    if (prop in target) {
      return Reflect.get(target, prop);
    }
    throw new Error(`Property ${prop} not found`);
  }
};

const dynamicObject = new Proxy({ name: 'Advanced JS' }, handler);

 
async function fetchData(urls) {
  const fetchPromises = urls.map(url => fetch(url));
  const results = await Promise.allSettled(fetchPromises);
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      print(`Response from ${urls[index]}:`, result.value);
    } else {
      console.error(`Error fetching ${urls[index]}:`, result.reason);
    }
  });
}

 
const privateData = new WeakMap();
const privateSymbol = Symbol('privateData');

class AdvancedClass {
  constructor(data) {
    privateData.set(this, data);
    this[privateSymbol] = 'This is private';
  }
  get data() {
    return privateData.get(this);
  }
}

 
(async () => {
  const urls = ['https://jsonplaceholder.typicode.com/posts', 'https://jsonplaceholder.typicode.com/users'];

  print('Reading file asynchronously:');
  for await (const line of readFileAsync('sample.txt')) {
    print(line);
  }

  print('\nUsing dynamic object access with Proxy:');
  print(dynamicObject.name);  
  try {
    print(dynamicObject.nonExistent);  
  } catch (error) {
    console.error(error.message);
  }

  console.log('\nFetching data from