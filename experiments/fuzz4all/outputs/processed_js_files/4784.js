 
import { promises as fs } from 'fs';

 
(async function main() {
  try {
     
    const [filePath, content] = ['./output.txt', 'Hello, advanced JavaScript!'];

     
    await fs.writeFile(filePath, content);
    
     
    const data = await fs.readFile(filePath, 'utf-8');
    const upperCased = [...data].map(char => char.toUpperCase()).join('');
    
     
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    await delay(1000);

     
    const handler = {
      get(target, prop) {
        return prop in target ? target[prop] : `Property ${prop} does not exist`;
      }
    };

    const proxyObj = new Proxy({ message: upperCased }, handler);

     
    print(proxyObj.message?.toLowerCase() ?? 'No message');

     
    print(proxyObj.nonExistentProperty);
  } catch (error) {
    console.error('Error:', error);
  }
})();
