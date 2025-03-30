 
import { promises as fs } from 'fs';

 
async function complexOperation() {
  try {
     
    const [name, age] = ['Alice', 30];
    const user = { name, age };
    
     
    const handler = {
      get(target, prop, receiver) {
        print(`Accessing property ${prop}`);
        return Reflect.get(...arguments);
      }
    };
    
    const userProxy = new Proxy(user, handler);

     
    print(`User Name: ${userProxy.name}, User Age: ${userProxy.age}`);
    
     
    const data = await fs.readFile('./data.txt', 'utf-8');

     
    const wordsCount = new Map();
    data.split(/\s+/).forEach(word => {
      const count = wordsCount.get(word) || 0;
      wordsCount.set(word, count + 1);
    });

     
    print('Word Counts:', [...wordsCount.entries()]);

     
    const uniqueWords = new Set(data.split(/\s+/));
    print('Unique Words:', [...uniqueWords]);

  } catch (error) {
    console.error('Error during complex operation:', error);
  }
}

 
complexOperation();
