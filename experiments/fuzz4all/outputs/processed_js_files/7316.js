 

 
function* asyncOperationSequence() {
  yield new Promise(resolve => setTimeout(() => resolve('Step 1 complete'), 1000));
  yield new Promise(resolve => setTimeout(() => resolve('Step 2 complete'), 1000));
  yield new Promise(resolve => setTimeout(() => resolve('Step 3 complete'), 1000));
}

 
async function executeOperations(generator) {
  for (const operation of generator()) {
    const result = await operation;
    print(result);
  }
}

 
const logHandler = {
  get(target, property) {
    if (typeof target[property] === 'function') {
      return function(...args) {
        print(`Calling ${property} with arguments: ${args}`);
        return target[property].apply(this, args);
      };
    }
    return target[property];
  }
};

 
const obj = {
  greet(name) {
    return `Hello, ${name}!`;
  }
};

 
const proxiedObj = new Proxy(obj, logHandler);

 
print(proxiedObj.greet('world'));

 
executeOperations(asyncOperationSequence);
