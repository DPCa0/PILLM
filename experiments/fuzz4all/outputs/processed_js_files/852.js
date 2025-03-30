 
import { structuredClone } from 'node:util/promisify';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { performance } = require('perf_hooks');

 
async function* fetchDataSimulator(urls) {
  for (const url of urls) {
     
    yield new Promise((resolve) => setTimeout(() => resolve(`Data from ${url}`), 1000));
  }
}

 
const handler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Getting ${prop}`);
      return Reflect.get(target, prop);
    } else {
      throw new Error(`Property ${prop} not found`);
    }
  },
  set: (target, prop, value) => {
    if (typeof value === 'number') {
      print(`Setting ${prop} to ${value}`);
      return Reflect.set(target, prop, value);
    } else {
      throw new Error(`Property ${prop} can only be a number`);
    }
  }
};

const dataStore = new Proxy({ count: 0 }, handler);

 
(async () => {
  const urls = ['https://example.com/1', 'https://example.com/2', 'https://example.com/3'];
  const fetchGenerator = fetchDataSimulator(urls);

   
  const startTime = performance.now();

  for await (const data of fetchGenerator) {
    print(data);
  }

  dataStore.count = 5;  
  print(`Count is: ${dataStore.count}`);  

   
  const clonedDataStore = structuredClone(dataStore);
  print(`Cloned count is: ${clonedDataStore.count}`);

  const endTime = performance.now();
  print(`Operation completed in ${endTime - startTime} milliseconds`);
})();
