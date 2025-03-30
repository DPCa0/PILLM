 
import { readFile } from 'fs/promises';
import { createInterface } from 'readline';
import { EventEmitter } from 'events';
import axios from 'axios';

 
async function* readLines(filePath) {
  const fileStream = await readFile(filePath, 'utf8');
  const lines = fileStream.split('\n');
  for (const line of lines) {
    yield line;
  }
}

 
const handler = {
  set(obj, prop, value) {
    if (prop === 'age' && typeof value !== 'number') {
      throw new TypeError('Age must be a number');
    }
    if (prop === 'name' && typeof value !== 'string') {
      throw new TypeError('Name must be a string');
    }
    obj[prop] = value;
    return true;
  }
};

const person = new Proxy({}, handler);

 
const eventEmitter = new EventEmitter();

eventEmitter.on('readLine', (line) => {
  print(`New line read: ${line}`);
});

 
async function fetchData(url) {
  try {
    const response = await axios.get(url);
    print('Data fetched from API:', response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
(async () => {
  try {
     
    person.name = 'Alice';
    person.age = 30;

     
    const filePath = './someTextFile.txt';
    for await (const line of readLines(filePath)) {
      eventEmitter.emit('readLine', line);
    }

     
    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    await fetchData(url);

  } catch (error) {
    console.error('Error:', error);
  }
})();
