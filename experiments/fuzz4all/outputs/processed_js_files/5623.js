 

 
const handler = {
  get: (target, property) => {
    print(`Getting property '${property}'`);
    return target[property];
  },
  set: (target, property, value) => {
    print(`Setting property '${property}' to '${value}'`);
    target[property] = value;
    return true;
  }
};

const target = { name: 'John Doe', age: 30 };
const proxy = new Proxy(target, handler);

 
const asyncGenerator = async function*() {
  for (let i = 0; i < 3; i++) {
    yield await new Promise(resolve => setTimeout(() => resolve(i), 1000));
  }
};

 
const uniqueSymbol = Symbol('unique');

 
const enhancedObject = {
  [uniqueSymbol]: 'Special Value',
  process: async function() {
    const gen = asyncGenerator();
    for await (let value of gen) {
      print(`Processed value: ${value}`);
      proxy.age += value;
    }
  }
};

 
(async () => {
  print('Starting processing...');
  await enhancedObject.process();
  print('Final object state:', target);
  print('Special property value:', enhancedObject[uniqueSymbol]);
})();
