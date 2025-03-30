 

 
function* asyncGenerator() {
  yield fetchData(1);
  yield fetchData(2);
  yield fetchData(3);
}

 
function fetchData(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, data: `Data for ID ${id}` });
    }, 1000 * id);  
  });
}

 
async function handleAsyncGenerator(generator) {
  for (let promise of generator) {
    const result = await promise;
    print(result);
  }
}

 
const handler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Getting property ${prop}`);
      return target[prop];
    } else {
      console.warn(`Property ${prop} does not exist.`);
      return undefined;
    }
  },
  set: (target, prop, value) => {
    print(`Setting property ${prop} to ${value}`);
    target[prop] = value;
    return true;
  },
};

 
const targetObject = { existingProp: 'I exist!' };
const proxyObject = new Proxy(targetObject, handler);

 
print(proxyObject.existingProp);  
proxyObject.newProp = 'Hello, Proxy!';   
print(proxyObject.newProp);        
print(proxyObject.nonExistent);    

 
handleAsyncGenerator(asyncGenerator());
