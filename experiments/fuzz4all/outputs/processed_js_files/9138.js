 

 
const asyncOperation = (id, duration) => new Promise((resolve) => {
  setTimeout(() => resolve(`Operation ${id} completed`), duration);
});

 
function* generateAsyncOperations() {
  let id = 1;
  while (id <= 5) {
    yield asyncOperation(id, Math.random() * 2000);
    id++;
  }
}

 
async function runAsyncGenerators() {
  const asyncOpsGen = generateAsyncOperations();

  for await (const result of {
    [Symbol.asyncIterator]: async function* () {
      for (let op of asyncOpsGen) {
        yield await op;
      }
    }
  }) {
    print(result);
  }
}

 
const targetObject = { a: 1, b: 2 };
const handler = {
  get(target, prop) {
    print(`Accessing property '${prop}':`, target[prop]);
    return target[prop];
  },
  set(target, prop, value) {
    print(`Setting property '${prop}' to`, value);
    target[prop] = value;
    return true;
  }
};
const proxyObject = new Proxy(targetObject, handler);

 
Reflect.set(proxyObject, 'c', 3);
Reflect.get(proxyObject, 'a');

 
runAsyncGenerators();
