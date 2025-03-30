 

 
function* generatePromises() {
  yield new Promise((resolve) => setTimeout(() => resolve('First Promise Resolved!'), 1000));
  yield new Promise((resolve) => setTimeout(() => resolve('Second Promise Resolved!'), 500));
  yield new Promise((resolve) => setTimeout(() => resolve('Third Promise Resolved!'), 1500));
}

 
async function handlePromises(generator) {
  const iterator = generator();
  let result = iterator.next();
  while (!result.done) {
    print(await result.value);
    result = iterator.next();
  }
}

 
const handler = {
  get: function(target, prop, receiver) {
    if (typeof target[prop] === 'function') {
      return function (...args) {
        print(`Calling ${prop} with arguments: ${JSON.stringify(args)}`);
        return Reflect.apply(target[prop], receiver, args);
      };
    }
    return Reflect.get(target, prop, receiver);
  }
};

 
const sampleObject = {
  greet(name) {
    return `Hello, ${name}!`;
  },
  add(x, y) {
    return x + y;
  }
};

const proxiedObject = new Proxy(sampleObject, handler);

 
(async () => {
  print(proxiedObject.greet('Alice'));
  print(proxiedObject.add(5, 7));

  print('--- Handling Promises via Generator ---');
  await handlePromises(generatePromises);
})();
