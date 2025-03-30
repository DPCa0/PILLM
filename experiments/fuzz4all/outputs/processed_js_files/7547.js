 
import { EventEmitter } from 'events';

 
async function* asyncNumberSequence(max, delay) {
  for (let i = 0; i < max; i++) {
    await new Promise((resolve) => setTimeout(resolve, delay));
    yield i;
  }
}

 
const handler = {
  get: (obj, prop) => (prop in obj ? obj[prop] : `Property ${prop} not found`),
};

 
const target = {
  name: 'AdvancedJS',
  type: 'CodeSample',
};

 
const proxy = new Proxy(target, handler);

 
const privateData = new WeakMap();
class ComplexClass {
  constructor(name) {
    privateData.set(this, { name });
  }

  getName() {
    return privateData.get(this).name;
  }

  setName(name) {
    const data = privateData.get(this);
    data.name = name;
  }
}

 
const instance = new ComplexClass('InitialName');
print(`Name before: ${instance.getName()}`);
instance.setName('UpdatedName');
print(`Name after: ${instance.getName()}`);

 
const eventEmitter = new EventEmitter();

 
eventEmitter.on('data', async (value) => {
  print(`Received value: ${value}`);
});

 
eventEmitter.on('finish', () => {
  print('All data received');
});

 
(async () => {
   
  for await (const number of asyncNumberSequence(5, 1000)) {
     
    eventEmitter.emit('data', number);
  }
   
  eventEmitter.emit('finish');

   
  console.log(`