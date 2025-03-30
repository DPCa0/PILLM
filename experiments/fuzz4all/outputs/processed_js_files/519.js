 

 
function* generateData() {
  yield new Promise((resolve) => setTimeout(() => resolve(1), 1000));
  yield new Promise((resolve) => setTimeout(() => resolve(2), 500));
  yield new Promise((resolve) => setTimeout(() => resolve(3), 1500));
}

 
async function processData(generator) {
  for (let promise of generator) {
    const data = await promise;
    print(`Data: ${data}`);
  }
}

 
const handler = {
  get: (target, prop, receiver) => {
    if (typeof target[prop] === 'function') {
      return function (...args) {
        print(`Method ${prop} called with arguments: ${args}`);
        return target[prop].apply(this, args);
      };
    }
    return Reflect.get(target, prop, receiver);
  }
};

 
const complexObject = {
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b
};

 
const proxyObject = new Proxy(complexObject, handler);

 
(async () => {
  print('Processing data...');
  await processData(generateData());

  print('Performing calculations...');
  print(`Multiply 3 by 4: ${proxyObject.multiply(3, 4)}`);
  print(`Divide 10 by 2: ${proxyObject.divide(10, 2)}`);
})();
