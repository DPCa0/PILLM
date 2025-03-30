 
import fs from 'fs';
import crypto from 'crypto';
import { promisify } from 'util';

 
const readFileAsync = promisify(fs.readFile);

 
(async () => {
  try {
     
    const data = await readFileAsync('sample.txt', 'utf8');
    
     
    const hash = crypto.createHash('sha256');
    hash.update(data);
    const digest = hash.digest('hex');
    
    print(`Content of the file: ${data}`);
    print(`SHA-256 Hash: ${digest}`);
    
     
    const user = { name: 'Alice', age: 30 };
    const handler = {
      get(target, prop) {
        if (prop === 'age') {
          return `The age is private!`;
        }
        return Reflect.get(target, prop);
      }
    };
    
    const proxyUser = new Proxy(user, handler);
    
    print(`User name: ${proxyUser.name}`);
    print(`User age: ${proxyUser.age}`);
    
     
    function* fibonacci(n) {
      let [prev, curr] = [0, 1];
      for (let i = 0; i < n; i++) {
        yield prev;
        [prev, curr] = [curr, prev + curr];
      }
    }
    
    const fibSeq = fibonacci(10);
    print('First 10 Fibonacci numbers:', [...fibSeq]);
    
  } catch (error) {
    console.error('Error occurred:', error);
  }
})();
