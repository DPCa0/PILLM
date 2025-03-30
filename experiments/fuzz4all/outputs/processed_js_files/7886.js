 
const asyncOp = (msg, delay) => 
  new Promise(resolve => setTimeout(() => resolve(`Resolved: ${msg}`), delay));

 
async function* asyncGenerator() {
  yield await asyncOp('First operation', 1000);
  yield await asyncOp('Second operation', 2000);
  yield await asyncOp('Third operation', 1500);
}

 
(async () => {
  for await (const result of asyncGenerator()) {
    print(result);
  }
})();

 
const target = { value: 42 };
const handler = {
  get: (obj, prop) => {
    print(`Getting ${prop}`);
    return prop in obj ? obj[prop] : 'Property does not exist';
  },
  set: (obj, prop, value) => {
    print(`Setting ${prop} to ${value}`);
    obj[prop] = value;
    return true;
  }
};

const proxy = new Proxy(target, handler);

print(proxy.value);  
proxy.value = 100;  
print(proxy.newProp);  

 
const map = new Map();
const set = new Set();
const sym = Symbol('uniqueKey');

map.set(sym, 'Value for Symbol Key');
set.add(sym);

print(map.get(sym));  
print(set.has(sym));  

 
const [a, b, ...rest] = [1, 2, 3, 4, 5];
print(a, b);  
print(rest);  

const obj = { x: 10, y: 20, z: 30 };
const { x, ...remaining } = obj;
print(x);  
print(remaining);  

 
class MyClass {
  static staticMethod() {
    return 'Static method called';
  }
}

print(MyClass.staticMethod());  

 
function tag(strings, ...values) {
  print(strings.raw[0]);  