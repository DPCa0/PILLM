 
const fs = require('fs').promises;

 
(async function complexFeaturesDemo() {
  try {
     
    const config = {
      api: {
        endpoint: 'https://api.example.com',
        timeout: 5000
      }
    };
    const { api: { endpoint, timeout = 3000 } } = config;
    
     
    print(`Connecting to ${endpoint} with a timeout of ${timeout}ms`);

     
    await fs.writeFile('example.txt', 'This is a complex JavaScript demo!', 'utf8');

     
    const myMap = new Map();
    myMap.set('key1', 'value1');
    myMap.set('key2', 'value2');
    
    const mySet = new Set([1, 2, 3, 4, 5]);

     
    const newArray = [...mySet].map(x => x * 2);

     
    const [first, ...rest] = newArray;
    print(`First: ${first}, Rest: ${rest}`);

     
    const sym = Symbol('unique');
    const obj = { [sym]: 'This is a symbol property' };
    Reflect.set(obj, 'newProp', 'This is a new property');

    print(obj[sym], obj.newProp);

     
    const handler = {
      get: function(target, prop, receiver) {
        print(`Property '${prop}' accessed!`);
        return Reflect.get(target, prop, receiver);
      }
    };

    const proxy = new Proxy(obj, handler);
    print(proxy.newProp);

     
    async function* generateData() {
      yield Promise.resolve('First');
      yield Promise.resolve('Second');
      yield Promise.resolve('Third');
    }

    for await (const val of generateData()) {
      print(val);
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
