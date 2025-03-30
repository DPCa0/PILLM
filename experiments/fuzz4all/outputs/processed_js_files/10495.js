 

 
function asyncOperation(duration) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Completed in ${duration}ms`), duration);
  });
}

 
function* promiseGenerator() {
  yield asyncOperation(1000);
  yield asyncOperation(500);
  yield asyncOperation(1500);
}

 
async function processPromises(generator) {
  let result = generator.next();
  while (!result.done) {
    print(await result.value);
    result = generator.next();
  }
}

 
const target = {
  message: 'Hello, world!',
  length: 13
};

const handler = {
  get: (obj, prop) => {
    print(`Accessing property '${prop}'`);
    return prop in obj ? obj[prop] : `Property '${prop}' not found`;
  }
};

const proxy = new Proxy(target, handler);

 
processPromises(promiseGenerator());

 
print(proxy.message);
print(proxy.length);
print(proxy.nonExistentProp);
