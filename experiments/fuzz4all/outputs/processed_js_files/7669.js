 

 
function asyncOperation(value, delay) {
  return new Promise((resolve) => setTimeout(() => resolve(value), delay));
}

 
function* generatorFunc() {
  yield asyncOperation('Step 1 completed', 1000);
  yield asyncOperation('Step 2 completed', 500);
  yield asyncOperation('Step 3 completed', 2000);
}

 
async function runGenerator(gen) {
  const iterator = gen();
  let result = iterator.next();
  
  while (!result.done) {
    print(await result.value);
    result = iterator.next();
  }
}

 
const targetObject = { prop1: 'value1', prop2: 'value2' };
const handler = {
  get: function(target, prop, receiver) {
    print(`Property "${prop}" has been accessed`);
    return Reflect.get(target, prop, receiver);
  }
};

const proxy = new Proxy(targetObject, handler);

 
print(proxy.prop1);
print(proxy.prop2);

 
runGenerator(generatorFunc);
