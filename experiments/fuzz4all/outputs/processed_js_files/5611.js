 
const uniqueKey = Symbol('unique');

 
const observedObject = new Proxy({ count: 0 }, {
  get(target, prop) {
    print(`Getting property ${prop}: ${target[prop]}`);
    return target[prop];
  },
  set(target, prop, value) {
    print(`Setting property ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
});

 
async function* asyncGenerator() {
  yield await new Promise(resolve => setTimeout(() => resolve('First'), 1000));
  yield await new Promise(resolve => setTimeout(() => resolve('Second'), 1000));
  yield await new Promise(resolve => setTimeout(() => resolve('Third'), 1000));
}

 
(async () => {
  for await (const value of asyncGenerator()) {
    print(`Async generator value: ${value}`);
  }
})();

 
const map = new Map();
map.set('foo', 'bar');
map.set(observedObject, 'dynamic value');
map.set(uniqueKey, 'unique value');

 
function tag(strings, ...values) {
  return strings.reduce((acc, str, idx) => acc + str + (values[idx] || ''), '');
}

const name = 'Alice';
const message = tag`Hello, ${name}! Welcome to the advanced JavaScript world.`;
print(message);

 
const { a = 1, b = 2, ...rest } = { b: 42, c: 3, d: 4 };
print(`a: ${a}, b: ${b}, rest:`, rest);

 
const metadata = new WeakMap();
const obj1 = {};
metadata.set(obj1, { data: 'important info' });
print('Metadata for obj1:', metadata.get(obj1));

 
observedObject.count = 1;
observedObject.count = 2;

 
 
 
 
``