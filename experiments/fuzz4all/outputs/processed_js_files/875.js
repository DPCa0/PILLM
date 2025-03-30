 

 
function simulateAsyncOperation(time) {
  return new Promise((resolve) => setTimeout(() => resolve(time), time));
}

 
function* generateTasks() {
  yield simulateAsyncOperation(1000);
  yield simulateAsyncOperation(2000);
  yield simulateAsyncOperation(1500);
}

 
const handler = {
  get(target, prop, receiver) {
    if (prop in target) {
      print(`Accessing property ${prop}`);
      return Reflect.get(...arguments);
    }
    print(`Property ${prop} does not exist`);
    return undefined;
  },
};

 
const proxyGenerator = new Proxy(generateTasks(), handler);

 
async function runTasks() {
  for (let promise of proxyGenerator) {
    const time = await promise;
    print(`Task completed in ${time} ms`);
  }
}

 
runTasks();
