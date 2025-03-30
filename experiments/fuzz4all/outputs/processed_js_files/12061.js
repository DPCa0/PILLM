 
import { promises as fs } from 'fs';

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
const withLogging = func => async (...args) => {
  print(`Starting ${func.name} with args: ${args}`);
  const result = await func(...args);
  print(`Finished ${func.name} with result: ${result}`);
  return result;
};

 
const readFileContent = withLogging(async (filename) => {
  try {
    const data = await fs.readFile(filename, 'utf8');
    return data;
  } catch (error) {
    throw new Error(`Failed to read file: ${error.message}`);
  }
});

 
const person = new Proxy({ name: 'Alice', age: 30 }, {
  get(target, property) {
    if (property === 'age') {
      print(`Accessing age: ${target[property]}`);
    }
    return target[property];
  },
  set(target, property, value) {
    if (property === 'age' && (value < 0 || value > 120)) {
      throw new Error('Invalid age value');
    }
    target[property] = value;
    return true;
  }
});

 
(async () => {
  try {
    print(person.name);
    person.age = 35;
    print(person.age);

    print('Waiting for 2 seconds...');
    await delay(2000);

    const content = await readFileContent('./example.txt');
    print(`File Content: ${content}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
})();
