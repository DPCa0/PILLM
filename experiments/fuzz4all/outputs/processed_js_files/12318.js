 

 
const handler = {
  get(target, prop, receiver) {
    if (prop in target) {
      print(`Getting property "${prop}"`);
      return Reflect.get(target, prop, receiver);
    } else {
      throw new ReferenceError(`Property "${prop}" does not exist.`);
    }
  },
  set(target, prop, value, receiver) {
    print(`Setting property "${prop}" to ${value}`);
    return Reflect.set(target, prop, value, receiver);
  }
};

const originalObject = { hello: "world", answer: 42 };
const proxyObject = new Proxy(originalObject, handler);

 
function* generatorExample() {
  yield 'Start';
  const message = yield simulateAsyncOperation('Processing async operation');
  yield `Result: ${message}`;
}

 
function simulateAsyncOperation(msg) {
  return new Promise(resolve => {
    setTimeout(() => resolve(msg), 1000);
  });
}

 
async function executeGenerator(gen) {
  let result = gen.next();
  while (!result.done) {
    print(result.value);
    if (result.value instanceof Promise) {
      const awaited = await result.value;
      result = gen.next(awaited);
    } else {
      result = gen.next();
    }
  }
}

 
try {
  print(proxyObject.hello);
  proxyObject.answer = 100;
  print(proxyObject.answer);
  print(proxyObject.nonExistent);
} catch (e) {
  console.error(e.message);
}

 
executeGenerator(generatorExample());
