 

 
const logHandler = {
  get: function(target, prop, receiver) {
    print(`Getting ${String(prop)}`);
    return Reflect.get(...arguments);
  },
  set: function(target, prop, value, receiver) {
    print(`Setting ${String(prop)} to ${value}`);
    return Reflect.set(...arguments);
  }
};

const targetObject = { value: 42 };
const proxyObject = new Proxy(targetObject, logHandler);

 
function* sequenceGenerator() {
  print('Generator started');
  proxyObject.value++;
  yield new Promise(resolve => setTimeout(() => resolve('Step 1 completed'), 1000));
  
  proxyObject.value *= 2;
  yield new Promise(resolve => setTimeout(() => resolve('Step 2 completed'), 1000));

  proxyObject.value -= 10;
  yield new Promise(resolve => setTimeout(() => resolve('Step 3 completed'), 1000));
}

 
async function executeSequence() {
  const generator = sequenceGenerator();
  let result = generator.next();
  
  while (!result.done) {
    print(await result.value);
    result = generator.next();
  }

  print(`Final value: ${proxyObject.value}`);
}

 
executeSequence();
