 
const handler = {
  get(target, prop, receiver) {
    print(`Getting property ${String(prop)}`);
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    print(`Setting property ${String(prop)} to ${value}`);
    return Reflect.set(target, prop, value, receiver);
  }
};

const targetObj = { message: "Hello, Proxy!" };
const proxyObj = new Proxy(targetObj, handler);

print(proxyObj.message);  
proxyObj.message = "Hello, world!";  

 
function* generatorFunction() {
  yield new Promise(resolve => setTimeout(() => resolve('Hello'), 1000));
  yield new Promise(resolve => setTimeout(() => resolve('world!'), 1000));
}

(async function() {
  const generator = generatorFunction();
  for await (let value of generator) {
    print(value);
  }
})();

 
const map = new Map();
map.set(1, 'one');
map.set(2, 'two');
map.set(3, 'three');

for (let [key, value] of map) {
  print(`Map Key: ${key}, Value: ${value}`);
}

const set = new Set(['apple', 'banana', 'orange']);
set.add('apple');  
set.delete('banana');

for (let item of set) {
  print(`Set Item: ${item}`);
}
