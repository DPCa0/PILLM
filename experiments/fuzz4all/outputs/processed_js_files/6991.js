 

 
function asyncOperation(value, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (value) {
        resolve(`Processed: ${value}`);
      } else {
        reject('No value provided');
      }
    }, delay);
  });
}

 
const handler = {
  get(target, prop) {
    print(`Getting property ${prop}`);
    return target[prop];
  },
  set(target, prop, value) {
    print(`Setting property ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
};

 
const targetObject = {
  data: 'Hello',
  count: 0
};

 
const proxyObject = new Proxy(targetObject, handler);

 
async function performComplexOperations() {
  try {
     
    proxyObject.data = 'Advanced JavaScript';
    print(proxyObject.data);

     
    const result1 = await asyncOperation(proxyObject.data, 1000);
    print(result1);

    const result2 = await asyncOperation('Another operation', 500);
    print(result2);

     
    proxyObject.count += 1;
    print(`Count after operations: ${proxyObject.count}`);
  } catch (error) {
    console.error('Error:', error);
  }
}

 
performComplexOperations();
