 
import { readFile } from 'fs/promises';

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
(async () => {
  try {
     
    const [first, ...rest] = [10, 20, 30, 40];
    print(`First: ${first}, Rest: ${rest}`);

     
    const data = await readFile('example.txt', 'utf-8');
    print('File content:', data);

     
    const tag = (strings, ...values) => strings.raw[0] + values.map((val, i) => `***${val}***${strings.raw[i + 1]}`).join('');
    const taggedResult = tag`Tagged ${'Template'} with ${'JS'}`;
    print(taggedResult);

     
    const handler = {
      get(target, prop) {
        return prop in target ? target[prop] : 'Property does not exist';
      }
    };
    const proxyObj = new Proxy({ a: 1 }, handler);
    print('Proxy get a:', proxyObj.a);
    print('Proxy get b:', proxyObj.b);

     
    async function* asyncGenerator() {
      let i = 0;
      while (i < 3) {
        await delay(1000);
        yield i++;
      }
    }
    
     
    for await (const num of asyncGenerator()) {
      print('Async generator number:', num);
    }

  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
