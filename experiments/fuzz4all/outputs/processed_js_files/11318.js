 

 
const handler = {
  get: function(target, prop, receiver) {
    if (prop in target) {
      print(`Getting ${prop}`);
      return Reflect.get(target, prop, receiver);
    } else {
      return `Property ${prop} doesn't exist`;
    }
  },
  set: function(target, prop, value) {
    print(`Setting ${prop} to ${value}`);
    return Reflect.set(target, prop, value);
  }
};

const targetObject = { a: 1, b: 2 };
const proxyObject = new Proxy(targetObject, handler);

// Usage of Proxy
proxyObject.a; // Getting a
proxyObject.c; // Property c doesn't exist
proxyObject.b = 4;  

 
function* generatorFunc() {
  yield Promise.resolve(1);
  yield Promise.resolve(2);
  yield Promise.resolve(3);
}

async function processGenerator(genFunc) {
  for await (let value of genFunc()) {
    print(`Resolved value: ${value}`);
  }
}

 
processGenerator(generatorFunc);

 
const map = new Map();
map.set('key1', 'value1');
map.set('key2', 'value2');

const set = new Set([1, 2, 3, 4]);

print('Map and Set Usage:');
print(map.get('key1'));  
print(set.has(3));  

 
function customTag(strings, ...expressions) {
  return strings.raw.map((str, i) => `${str}${expressions[i] || ''}`).join('');
}

const name = 'world';
print(customTag`Hello, \u0040${name}\u0021`);  
