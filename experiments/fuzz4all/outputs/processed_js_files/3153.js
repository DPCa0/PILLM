 
import { readFile } from 'fs/promises';

 
async function* readLines(filePath) {
  const content = await readFile(filePath, 'utf-8');
  yield* content.split('\n');
}

 
const target = { message: 'Hello, Proxy!' };
const handler = {
  get: (obj, prop) => {
    print(`Getting property '${prop}'`);
    return obj[prop];
  },
  set: (obj, prop, value) => {
    print(`Setting property '${prop}' to '${value}'`);
    obj[prop] = value;
    return true;
  }
};
const proxy = new Proxy(target, handler);

 
const sum = (...numbers) => numbers.reduce((total, num) => total + num, 0);

 
(async () => {
  const [a, b, c] = [1, 2, 3];
  print(`Sum of ${a}, ${b}, and ${c} is:`, sum(a, b, c));

  proxy.message = 'Hello, Dynamic World!';
  print(proxy.message);

   
  try {
    for await (const line of readLines('./sample.txt')) {
      print(`Line: ${line}`);
    }
  } catch (error) {
    console.error('Error reading file:', error);
  }
})();
