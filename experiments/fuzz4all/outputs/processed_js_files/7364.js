 

 
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

 
function* asyncGenerator() {
  print("Generator started");
  yield delay(1000).then(() => print("Yield 1 completed"));
  yield delay(1000).then(() => print("Yield 2 completed"));
  yield delay(1000).then(() => print("Yield 3 completed"));
}

 
async function runGenerator(gen) {
  for (let promise of gen()) {
    await promise;
  }
  print("Generator execution finished");
}

 
const handler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Accessed property "${prop}"`);
      return target[prop];
    } else {
      print(`Property "${prop}" does not exist`);
      return undefined;
    }
  },
  set: (target, prop, value) => {
    print(`Setting property "${prop}" to "${value}"`);
    target[prop] = value;
    return true;
  }
};

 
const targetObject = {
  a: 1,
  b: 2
};

 
const proxyObject = new Proxy(targetObject, handler);

 
proxyObject.a;  
proxyObject.b = 42;  
proxyObject.c;  

 
runGenerator(asyncGenerator);
