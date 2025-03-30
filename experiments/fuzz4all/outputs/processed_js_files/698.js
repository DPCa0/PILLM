 
const target = {
  message1: "hello",
  message2: "world"
};

const handler = {
  get: function(obj, prop) {
    if (prop === 'greet') {
      return `${obj.message1}, ${obj.message2}!`;
    }
    return obj[prop];
  },
  set: function(obj, prop, value) {
    if (prop === 'message1' || prop === 'message2') {
      print(`Setting ${prop} to "${value}"`);
    }
    obj[prop] = value;
  }
};

const proxy = new Proxy(target, handler);

print(proxy.greet);  

proxy.message1 = "Hi";
proxy.message2 = "everyone";

print(proxy.greet);  

 
async function* asyncGenerator() {
  let i = 0;
  while (i < 3) {
    yield await new Promise(resolve => setTimeout(() => resolve(i++), 1000));
  }
}

(async function() {
  for await (const num of asyncGenerator()) {
    print(num);  
  }
})();

 
const uniqueKey = Symbol('uniqueKey');

const objWithSymbol = {
  [uniqueKey]: 'This is a unique value'
};

print(objWithSymbol[uniqueKey]);  

 
const map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three']
]);

for (const [key, value] of map) {
  print(`${key} = ${value}`);  
}
