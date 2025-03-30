 
const handler = {
  get(target, prop) {
    if (prop in target) {
      print(`Getting ${prop}: ${target[prop]}`);
      return target[prop];
    } else {
      throw new ReferenceError(`Property "${prop}" does not exist.`);
    }
  },
  set(target, prop, value) {
    if (typeof value === 'number') {
      print(`Setting ${prop} to ${value}`);
      target[prop] = value;
      return true;
    } else {
      throw new TypeError(`Property "${prop}" must be a number.`);
    }
  }
};

const obj = new Proxy({ a: 1, b: 2 }, handler);

 
async function* asyncGenerator() {
  const promises = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];
  for (const promise of promises) {
    yield await promise;
  }
}

 
(async function() {
  for await (const num of asyncGenerator()) {
    print(`Async num: ${num}`);
    obj.b += num;  
  }
})();

 
const { a, b, c = 3 } = obj;
print(`Destructured: a = ${a}, b = ${b}, c = ${c}`);

 
const map = new Map();
const set = new Set();
const weakMap = new WeakMap();

const keyObj = { id: 1 };

map.set('key', 'value');
set.add(1);
weakMap.set(keyObj, 'weakValue');

print(`Map has 'key': ${map.has('key')}`);
print(`Set has 1: ${set.has(1)}`);
print(`WeakMap has keyObj: ${weakMap.has(keyObj)}`);

 
const name = 'World';
print(`Hello, ${name}!`);
