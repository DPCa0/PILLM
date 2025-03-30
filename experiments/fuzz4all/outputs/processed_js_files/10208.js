 
import fs from 'fs/promises';

(async () => {
   
  const handler = {
    get(target, property) {
      if (property in target) {
        print(`Getting property ${property}`);
        return target[property];
      }
      throw new ReferenceError(`Property ${property} does not exist.`);
    },
    set(target, property, value) {
      if (typeof value === 'number') {
        print(`Setting property ${property} to ${value}`);
        target[property] = value;
        return true;
      }
      throw new TypeError('Property values must be numbers.');
    }
  };

  const complexObject = new Proxy({ a: 1, b: 2 }, handler);

   
  Reflect.set(complexObject, 'c', 3);
  print(Reflect.get(complexObject, 'c'));  

   
  async function createFile() {
    const data = 'Hello, FileSystem with promises!';
    await fs.writeFile('example.txt', data);
    print('File written successfully');
  }

  try {
    await createFile();
    const fileContent = await fs.readFile('example.txt', 'utf8');
    print(`File content: ${fileContent}`);
  } catch (error) {
    console.error('Error:', error);
  }

   
  function* numberGenerator() {
    let num = 1;
    while (true) {
      yield num++;
    }
  }

  const gen = numberGenerator();
  print(gen.next().value);  
  print(gen.next().value);  

   
  const setA = new Set([1, 2, 3]);
  const setB = new Set([3, 4, 5]);
  const union = new Set([...setA, ...setB]);
  print(union);  
})();
