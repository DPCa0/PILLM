 

 
function* generateSequence() {
  yield 1;
  yield 2;
  yield 3;
}

 
async function processSequence(gen) {
  for (let value of gen) {
    await new Promise(resolve => setTimeout(resolve, 1000));  
    print(`Processed value: ${value}`);
  }
}

 
const handler = {
  get(target, prop, receiver) {
    print(`Property "${prop}" accessed`);
    return Reflect.get(...arguments);  
  },
  set(target, prop, value, receiver) {
    print(`Property "${prop}" set to ${value}`);
    return Reflect.set(...arguments);  
  }
};

 
const targetObject = { status: 'pending' };
const proxyObject = new Proxy(targetObject, handler);

 
proxyObject.status = 'processing';  
print(proxyObject.status);    

 
processSequence(generateSequence());
