 
import { writeFile } from 'fs/promises';
import { EventEmitter } from 'events';

 
function LogMethod(target, propertyKey, descriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args) {
    print(`Calling ${propertyKey} with`, args);
    return originalMethod.apply(this, args);
  };
  return descriptor;
}

 
const _privateData = Symbol('privateData');

class ComplexClass extends EventEmitter {
  constructor(initialData) {
    super();
    this[_privateData] = initialData;
  }

  @LogMethod
  processData(input) {
     
    const processed = this.taggedString`Processing: ${input}`;
    this.emit('processed', processed);
    return processed;
  }

  taggedString(strings, value) {
    return `${strings[0]}${value.toUpperCase()}`;
  }

  get data() {
    return this[_privateData];
  }

  async saveDataToFile(filename) {
    try {
      await writeFile(filename, JSON.stringify(this[_privateData]));
      print('Data saved to file');
    } catch (error) {
      console.error('Error writing file', error);
    }
  }
}

 
const complexInstance = new ComplexClass({ key: 'value' });

complexInstance.on('processed', (data) => {
  print('Processed Event:', data);
});

const data = complexInstance.processData('test input');
complexInstance.saveDataToFile('output.json');
print('Private Data:', complexInstance.data);
