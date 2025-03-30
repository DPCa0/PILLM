class Deferred {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

async function* dataProducer() {
  let index = 0;
  const deferredArray = [];
  
  while (true) {
    const deferred = new Deferred();
    deferredArray.push(deferred);

    setTimeout(() => {
      if (index < 5) {
        deferred.resolve(`Data-${index++}`);
      } else {
        deferred.resolve(null);  
      }
    }, Math.random() * 1000);

    const value = await deferred.promise;
    if (value === null) break;
    yield value;
  }
}

(async () => {
  const dataGen = dataProducer();
  for await (const data of dataGen) {
    print(`Received: ${data}`);
  }
  print('All data received.');
})();

 
const handler = {
  get(target, prop, receiver) {
    print(`Property "${prop}" accessed.`);
    return Reflect.get(...arguments);
  }
};

const user = new Proxy({
  name: 'Alice',
  age: 30
}, handler);

print(user.name);
print(user.age);

 
const map = new Map();
const set = new Set();

map.set('key1', 'value1');
map.set('key2', 'value2');
set.add('key1');
set.add('key3');

for (const key of set) {
  print(`Set contains: ${key}`);
  if (map.has(key)) {
    print(`Map also contains ${key} with value: ${map.get(key)}`);
  }
}

 
const sym = Symbol('uniqueIdentifier');
const objectWithSymbol = {
  [sym]: 'Special Symbol Value',
  regularProp: 'Regular Property Value'
};

print('Symbol property:', objectWithSymbol[sym]);
print('Reflect keys:', Reflect.ownKeys(objectWithSymbol));
