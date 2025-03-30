 
import fs from 'fs/promises';

 
async function readJSONFile(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading file:', error);
    throw error;
  }
}

 
function createLoggingProxy(target) {
  return new Proxy(target, {
    get(target, property, receiver) {
      print(`Getting property '${property}'`);
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      print(`Setting property '${property}' to '${value}'`);
      return Reflect.set(target, property, value, receiver);
    }
  });
}

 
function* numberGenerator() {
  let number = 0;
  while (true) {
    yield number++;
  }
}

 
async function main() {
  const filePath = './data.json';

   
  const data = await readJSONFile(filePath);

   
  const proxyData = createLoggingProxy(data);

   
  print(proxyData.someProperty);
  proxyData.newProperty = 'New Value';

   
  const gen = numberGenerator();
  print(gen.next().value);  
  print(gen.next().value);  

   
  function calculateSum(...numbers) {
    return numbers.reduce((acc, num) => acc + num, 0);
  }
  const sum = calculateSum(...[1, 2, 3, 4, 5]);
  print('Sum:', sum);
}

main().catch(console.error);

Note: Make sure you have a file named `data.json` with some JSON content in the same directory for the above code to work.