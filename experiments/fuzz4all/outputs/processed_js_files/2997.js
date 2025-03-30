 

 
function asyncOperation(duration) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.1) {
        resolve(`Completed after ${duration}ms`);
      } else {
        reject('Random failure');
      }
    }, duration);
  });
}

 
function* promiseGenerator() {
  yield asyncOperation(1000);
  yield asyncOperation(1500);
  yield asyncOperation(500);
}

 
async function handleGenerator(gen) {
  for (let promise of gen) {
    try {
      const result = await promise;
      print(result);
    } catch (error) {
      console.error('Error:', error);
    }
  }
}

 
const targetObject = { a: 1, b: 2 };
const handler = {
  get(target, prop) {
    print(`Getting ${prop}`);
    return target[prop];
  },
  set(target, prop, value) {
    print(`Setting ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
};
const proxyObject = new Proxy(targetObject, handler);

 
proxyObject.a;  
proxyObject.b = 3;  

 
const gen = promiseGenerator();
handleGenerator(gen);
