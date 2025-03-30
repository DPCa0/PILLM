 
import { promises as fs } from 'fs';

 
async function readFileAsync(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    print('File content:', data);
  } catch (error) {
    console.error('Error reading file:', error);
  }
}

 
const handler = {
  get(target, property) {
    print(`Accessed property: ${property}`);
    return target[property];
  },
};

const targetObject = {
  a: 1,
  b: 2,
  c: 3,
};

const proxy = new Proxy(targetObject, handler);

 
function* numberGenerator(limit) {
  let num = 1;
  while (num <= limit) {
    yield num++;
  }
}

 
(async () => {
   
  const { a, ...rest } = proxy;
  print('Destructured a:', a);
  print('Rest of the object:', rest);

   
  await readFileAsync('example.txt');

   
  const gen = numberGenerator(5);
  for (const value of gen) {
    print('Generated number:', value);
  }
})();
