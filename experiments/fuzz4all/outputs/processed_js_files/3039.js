 

 
function* dataGenerator() {
  yield new Promise(resolve => setTimeout(() => resolve(1), 1000));
  yield new Promise(resolve => setTimeout(() => resolve(2), 1000));
  yield new Promise(resolve => setTimeout(() => resolve(3), 1000));
}

 
async function consumeData(gen) {
  for await (let value of gen) {
    print(`Generated value: ${value}`);
  }
}

 
const handler = {
  get: function(target, prop, receiver) {
    if (prop in target) {
      print(`Getting ${prop}`);
      return Reflect.get(target, prop, receiver);
    }
    return `Property ${prop} does not exist`;
  },
  set: function(target, prop, value) {
    print(`Setting ${prop} to ${value}`);
    return Reflect.set(target, prop, value);
  }
};

 
const target = {
  a: 10,
  b: 20
};

 
const proxy = new Proxy(target, handler);

 
print(proxy.a);  
proxy.b = 30;          
print(proxy.c);  

 
(async function main() {
  const gen = dataGenerator();
  await consumeData(gen);
})();
