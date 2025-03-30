 
import { promises as fs } from 'fs';
import crypto from 'crypto';

 
const generateId = (length = 16) => crypto.randomBytes(length).toString('hex');

 
(async () => {
  try {
     
    const errorMsg = (strings, error) => `${strings[0]}${error}${strings[1]}`;
    
     
    const id = generateId();
    await fs.writeFile('randomId.txt', `Your generated ID is: ${id}\n`);
    
     
    async function* readAndProcessFile(filePath) {
      const content = await fs.readFile(filePath, 'utf-8');
      yield* content.split('\n');
    }

     
    for await (const line of readAndProcessFile('randomId.txt')) {
      if (line) print(line);
    }
    
  } catch (error) {
     
    console.error(errorMsg`An error occurred: ${error}`);
  }
})();

 
const target = {
  message: 'Hello, world!'
};

const handler = {
  get(target, prop, receiver) {
    print(`Getting property ${prop}`);
    return Reflect.get(...arguments);
  },
  set(target, prop, value) {
    print(`Setting property ${prop} to ${value}`);
    return Reflect.set(...arguments);
  }
};

const proxy = new Proxy(target, handler);

print(proxy.message);   
proxy.message = 'Advanced JavaScript!';   
print(proxy.message);
