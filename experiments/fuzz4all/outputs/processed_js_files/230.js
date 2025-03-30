 
const EventEmitter = require('events');

 
const observable = (obj) => {
  const emitter = new EventEmitter();
  return new Proxy(obj, {
    set(target, property, value) {
      if (target[property] !== value) {
        target[property] = value;
        emitter.emit('change', { property, value });
      }
      return true;
    }
  });
};

 
const asyncOperation = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve('Async Operation Complete!'), 1000);
  });
};

 
let obj = observable({ message: 'Hello' });

 
obj.on = (event, listener) => {
  EventEmitter.prototype.on.call(obj, event, listener);
};

obj.on('change', (change) => {
  print(`Property ${change.property} changed to ${change.value}`);
});

 
function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

 
const gen = idGenerator();

 
(async () => {
  print(`Generated ID: ${gen.next().value}`);
  print(await asyncOperation());
  
   
  obj.message = 'Hello, world!';
  obj.message = 'Hello, world!';  
  obj.message = 'Hello, JavaScript!';
})();
