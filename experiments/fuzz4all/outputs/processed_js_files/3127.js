 
import { EventEmitter } from 'events';

 
import { promisify } from 'util';
import fs from 'fs';
const readFileAsync = promisify(fs.readFile);

 
class ComplexClass extends EventEmitter {
  constructor() {
    super();
    this.init();
  }

  async init() {
     
    try {
      const data = await readFileAsync('./data.json', 'utf-8');
      const parsedData = JSON.parse(data);
      this.emit('dataParsed', parsedData);
    } catch (error) {
      this.emit('error', error);
    }
  }
}

 
const handler = {
  get: function(target, prop) {
    print(`Property '${prop}' has been accessed.`);
    return Reflect.get(...arguments);
  }
};

const complexInstance = new ComplexClass();
const proxyComplex = new Proxy(complexInstance, handler);

 
proxyComplex.on('dataParsed', (data) => {
  print('Data parsed successfully:', data);
});

proxyComplex.on('error', (error) => {
  console.error('An error occurred:', error.message);
});

 
function tag(strings, ...values) {
  return strings.reduce((result, string, i) => `${result}${string}<${values[i] || ''}>`, '');
}

const user = { name: 'Alice', level: 'Advanced' };
print(tag`User: ${user.name}, Level: ${user.level}`);

 
const uniqueKey = Symbol('unique');
const userMap = new Map();
userMap.set(uniqueKey, { user: user });

print('Unique User Data:', userMap.get(uniqueKey));
