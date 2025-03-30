 

 
const handler = {
  get(target, prop, receiver) {
    print(`Accessing property '${prop}'`);
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value) {
    print(`Setting property '${prop}' to '${value}'`);
    return Reflect.set(target, prop, value);
  }
};

 
let targetObject = {
  name: 'Complex JavaScript',
  version: '1.0'
};

 
const proxyObject = new Proxy(targetObject, handler);

 
function* asyncGenerator() {
  yield new Promise((resolve) => setTimeout(() => resolve('Resolved after 1 second'), 1000));
  yield new Promise((resolve) => setTimeout(() => resolve('Resolved after 2 seconds'), 2000));
  yield new Promise((resolve) => setTimeout(() => resolve('Resolved after 3 seconds'), 3000));
}

 
async function processGenerator() {
  const generator = asyncGenerator();
  for await (const message of generator) {
    print(message);
  }
}

 
proxyObject.name;
proxyObject.version = '2.0';
print(`Proxy name is: ${proxyObject.name}`);

 
processGenerator();
