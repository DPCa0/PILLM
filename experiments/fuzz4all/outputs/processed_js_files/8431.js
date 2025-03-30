 
const UNIQUE_KEY = Symbol('unique');

 
const handler = {
  get: function(target, prop, receiver) {
    print(`Getting property ${String(prop)}`);
    return Reflect.get(...arguments);
  },
  set: function(target, prop, value, receiver) {
    print(`Setting property ${String(prop)} to ${value}`);
    return Reflect.set(...arguments);
  }
};

 
const dynamicObject = new Proxy({
  [UNIQUE_KEY]: 'This is a unique symbol property',
  normalKey: 42,
  functionProperty: () => 'I am a function!'
}, handler);

 
print(dynamicObject.normalKey);
dynamicObject.normalKey = 100;
print(dynamicObject.functionProperty());
print(dynamicObject[UNIQUE_KEY]);

 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    print('Fetched data:', data);
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

 
fetchData('https://jsonplaceholder.typicode.com/posts/1');

 
function* numberGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const iterator = numberGenerator();
print(iterator.next().value);  
print(iterator.next().value);  
print(iterator.next().value);  

 
const { a, b, ...rest } = { a: 1, b: 2, c: 3, d: 4 };
print(a, b);  
print(rest);  

 
const map = new Map();
map.set('key1', 'value1');
map.set('key2', 'value2');
print(map.get('key1'));  

const set = new Set([1, 2, 3, 4,