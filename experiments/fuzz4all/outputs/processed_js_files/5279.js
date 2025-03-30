 

 
function asyncOperation(value, delay) {
  return new Promise(resolve => setTimeout(() => resolve(value), delay));
}

 
function* asyncGenerator() {
  print("Starting Generator...");
  yield asyncOperation('First Result', 1000);
  yield asyncOperation('Second Result', 2000);
  yield asyncOperation('Third Result', 3000);
  print("Generator Complete.");
}

 
async function handleGenerator(gen) {
  for (let promise of gen) {
    const result = await promise;
    print(result);
  }
}

 
const handler = {
  get(target, prop, receiver) {
    print(`Getting property: ${prop}`);
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    print(`Setting property: ${prop} to ${value}`);
    return Reflect.set(target, prop, value, receiver);
  }
};

 
const targetObject = {
  name: 'Advanced JS',
  level: 'Complex'
};

 
const proxyObject = new Proxy(targetObject, handler);

 
print(proxyObject.name);  
proxyObject.level = 'Advanced';  

 
handleGenerator(asyncGenerator());
