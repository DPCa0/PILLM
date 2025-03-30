 
import fs from 'fs/promises';
import { EventEmitter } from 'events';

 
async function readFileContent(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    print(`File Content:\n${data}`);
  } catch (error) {
    console.error('Error reading file:', error);
  }
}

 
(async () => {
   
  const { log } = await import('console');
  const files = ['./file1.txt', './file2.txt'];

  files.forEach(async (file) => await readFileContent(file));

  const coordinates = [{ x: 5, y: 6 }, { x: 10, y: 15 }];
  coordinates.forEach(({ x, y }) => log(`Coordinates: (${x}, ${y})`));

   
  class Counter extends EventEmitter {
    #count = 0;

    increment() {
      this.#count++;
      this.#notify();
    }

    decrement() {
      this.#count--;
      this.#notify();
    }

    #notify() {
      this.emit('update', this.#count);
    }
  }

  const counter = new Counter();
  counter.on('update', (count) => log(`Current count is: ${count}`));

   
  const handler = {
    get(target, prop, receiver) {
      if (typeof target[prop] === 'function') {
        return function (...args) {
          print(`Method called: ${prop} with args: ${JSON.stringify(args)}`);
          return target[prop].apply(this, args);
        };
      }
      return Reflect.get(target, prop, receiver);
    },
  };

  const proxiedCounter = new Proxy(counter, handler);

   
  proxiedCounter.increment();
  proxiedCounter.decrement();
  proxiedCounter.increment();

})();
