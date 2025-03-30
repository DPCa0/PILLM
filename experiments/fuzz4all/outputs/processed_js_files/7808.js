 
import { EventEmitter } from 'events';

 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function asyncOperation() {
  await delay(1000);
  return 'Data processed after delay';
}

 
const handler = {
  get: (target, property) => {
    print(`Property "${property}" accessed with value: ${target[property]}`);
    return target[property];
  },
  set: (target, property, value) => {
    print(`Property "${property}" set to value: ${value}`);
    target[property] = value;
    return true;
  }
};

const targetObj = { a: 1, b: 2 };
const proxyObj = new Proxy(targetObj, handler);

 
function* idGenerator() {
  let id = 0;
  while (true) {
    yield id++;
  }
}

const gen = idGenerator();

 
(async () => {
   
  proxyObj.a = 10;
  print(proxyObj.a);

   
  const result = await asyncOperation();
  print(result);

   
  const emitter = new EventEmitter();
  emitter.on('data', (id) => {
    print(`Event received with id: ${id}`);
  });

   
  for (let i = 0; i < 3; i++) {
    emitter.emit('data', gen.next().value);
  }
})();
