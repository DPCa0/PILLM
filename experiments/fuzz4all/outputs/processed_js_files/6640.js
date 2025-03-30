 
import fs from 'fs/promises';
import { EventEmitter } from 'events';

 
const handler = {
  set(target, property, value) {
    print(`Property ${property} set to ${value}`);
    target[property] = value;
    return true;
  }
};

const data = new Proxy({}, handler);

 
async function readFileAsync(path) {
  try {
    const content = await fs.readFile(path, 'utf8');
    print('File content:', content);
    return content;
  } catch (error) {
    console.error('Error reading file:', error);
  }
}

 
function* numberGenerator() {
  yield* [1, 2, 3, 4, 5];
}

const numbers = numberGenerator();

 
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

myEmitter.on('event', () => {
  print('An event occurred!');
});

 
(async () => {
  data.name = "JavaScript";

  const filePath = './sample.txt';
  await readFileAsync(filePath);

  for (let num of numbers) {
    print('Generated number:', num);
  }

  myEmitter.emit('event');

  const lodash = await import('lodash');
  print('Loaded lodash:', lodash.VERSION);
})();
