 
import { EventEmitter } from 'events';
import { promises as fs } from 'fs';

 
async function readFileAsync(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    print(`File Content:\n${data}`);
  } catch (error) {
    console.error(`Error reading file: ${error}`);
  }
}

 
class MyEmitter extends EventEmitter {
  #privateVar = 'I am private';  

  constructor() {
    super();
    this.on('event', () => {
      print('An event occurred!');
    });
  }

  @logExecutionTime
  triggerEvent() {
    this.emit('event');
  }

  async #logAndReadFile(filePath) {
    print(this.#privateVar);
    await readFileAsync(filePath);
  }

  async startProcess(filePath) {
    await this.#logAndReadFile(filePath);
  }
}

 
function logExecutionTime(target, name, descriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args) {
    console.time(name);
    const result = original.apply(this, args);
    console.timeEnd(name);
    return result;
  };
  return descriptor;
}

 
const settings = { theme: { color: 'dark' } };
print(`Theme color: ${settings?.theme?.color ?? 'default'}`);

 
(async () => {
  const emitter = new MyEmitter();
  emitter.triggerEvent();
  await emitter.startProcess('./example.txt');  
})();
