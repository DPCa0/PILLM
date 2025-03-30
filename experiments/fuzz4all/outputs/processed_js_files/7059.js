 
import { promises as fs } from 'fs';

 
const handler = {
  get: (target, prop, receiver) => {
    if (prop in target) {
      return Reflect.get(target, prop, receiver);
    }
    throw new ReferenceError(`Property "${prop}" does not exist.`);
  }
};

const dynamicObject = new Proxy({ greeting: "Hello" }, handler);

 
(async () => {
   
  const { greeting, name = 'World' } = dynamicObject;

   
  const bold = (strings, ...values) => {
    return strings.reduce((result, str, i) => result + str + (values[i] ? `<b>${values[i]}</b>` : ''), '');
  };

   
  const message = bold`${greeting}, ${name}!`;

   
  const uniqueWords = new Set(message.match(/\w+/g));

   
  try {
    await fs.writeFile('message.txt', message);
    const data = await fs.readFile('message.txt', 'utf8');
    
    print(`File written and read successfully! Content: ${data}`);
    print(`Unique Words: ${[...uniqueWords].join(', ')}`);
  } catch (error) {
    console.error('Error with file operations:', error);
  }
})();
