 
const uniqueIds = new Set();

 
function* idGenerator() {
  let id = 0;
  while (true) {
    yield id++;
  }
}

 
const handler = {
  get: (target, prop, receiver) => {
    if (prop in target) {
      print(`Getting property '${prop}': ${target[prop]}`);
      return target[prop];
    } else {
      print(`Property '${prop}' not found`);
      return undefined;
    }
  },
  set: (target, prop, value) => {
    print(`Setting property '${prop}' to ${value}`);
    target[prop] = value;
    return true;
  }
};

 
const _privateField = new WeakMap();

class SampleClass {
  constructor(name) {
    _privateField.set(this, { name });
  }

  getName() {
    return _privateField.get(this).name;
  }

  setName(name) {
    _privateField.get(this).name = name;
  }
}

 
const instance = new Proxy(new SampleClass('Initial Name'), handler);

 
const gen = idGenerator();
instance.setName('New Name');
uniqueIds.add(gen.next().value);
uniqueIds.add(gen.next().value);

 
async function asyncExample() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Async operation completed');
    }, 1000);
  });
}

 
(async () => {
  print(instance.getName());
  print(await asyncExample());
  print(`Generated Unique IDs: ${Array.from(uniqueIds).join(', ')}`);
})();
