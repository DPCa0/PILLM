 

 
function* asyncGenerator() {
  yield Promise.resolve(1);
  yield Promise.resolve(2);
  yield new Promise(resolve => setTimeout(() => resolve(3), 1000));
  yield Promise.resolve(4);
}

 
const generatorProxy = new Proxy(asyncGenerator(), {
  get(target, property) {
    if (property === Symbol.iterator) return target[property];
    return async () => {
      const { value, done } = await target.next();
      return done ? undefined : value;
    };
  },
  set(target, property, value) {
    print(`Can't set property ${property} to ${value}`);
    return false;
  }
});

// Async function to process each yielded value
async function processGenerator(genProxy) {
  for await (const value of genProxy) {
    print(`Processing value: ${value}`);
  }
  print('Generator finished.');
}

 
processGenerator(generatorProxy);
