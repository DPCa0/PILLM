 
import fs from 'fs/promises';

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
(async () => {
  try {
     
    await fs.writeFile('message.txt', 'Hello, world!');

     
    const { size } = await fs.stat('message.txt');
    print(`File created with size: ${size} bytes`);

     
    const handler = {
      get: (obj, prop) => {
        return prop in obj ? obj[prop] : `Property '${prop}' not found!`;
      }
    };

    const target = { greeting: 'Hello, world!' };
    const proxy = new Proxy(target, handler);
    print(proxy.greeting);
    print(proxy.nonexistentProp);

     
    async function* asyncGenerator() {
      yield 'Hello';
      await delay(1000);  
      yield 'world';
      await delay(1000);
      yield '!';
    }

    for await (const word of asyncGenerator()) {
      print(word);
    }

     
    const config = { endpoint: 'api.example.com' };
    const apiUrl = config.apiUrl ?? 'http://default-api.example.com';
    print(apiUrl);

  } catch (error) {
    console.error('Error:', error);
  }
})();
