 
import { promises as fs } from 'fs';

 
async function complexExample() {
  try {
     
    const uniqueSet = new Set([1, 2, 3, 4, 5]);

     
    const map = new Map();
    uniqueSet.forEach((value) => {
      map.set(value, `Value: ${value}`);
    });

     
    const mapValues = [...map.values()].join(', ');

     
    await fs.writeFile('output.txt', `Map Values: ${mapValues}\n`, 'utf8');

     
    const [first, second, ...rest] = uniqueSet;

    print(`First: ${first}, Second: ${second}, Rest: ${rest}`);

     
    const target = {
      message: "Hello, Proxies!"
    };
    const handler = {
      get: (obj, prop) => {
        return prop in obj ? obj[prop] : `Property ${prop} not found!`;
      }
    };
    const proxy = new Proxy(target, handler);
    print(proxy.message);
    print(proxy.nonExistentProperty);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

complexExample();
