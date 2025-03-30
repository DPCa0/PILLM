 
const { EventEmitter } = require('events');

 
const loggedObject = new Proxy({ x: 10, y: 20 }, {
  get(target, property) {
    print(`Accessing property ${property}`);
    return target[property];
  }
});

 
function* numberGenerator() {
  let num = 0;
  while (true) {
    yield num++;
  }
}

 
async function asyncFunction() {
  print('Async function start');
  await new Promise(resolve => setTimeout(resolve, 1000));
  print('Async function end');
}

 
(async () => {
  print('IIFE start');
  await asyncFunction();
  print('IIFE end');
})();

 
const map = new Map();
map.set('key1', 'value1');
map.set('key2', 'value2');

 
const eventEmitter = new EventEmitter();
eventEmitter.on('event', (message) => {
  print(`Event received: ${message}`);
});

 
print(loggedObject.x);
print(loggedObject.y);

 
const gen = numberGenerator();
print(gen.next().value);
print(gen.next().value);
print(gen.next().value);

 
eventEmitter.emit('event', 'Hello from event emitter!');

 
const array = [1, 2, 3];
const message = `Array: ${[...array, 4, 5, 6]}`;
print(message);
