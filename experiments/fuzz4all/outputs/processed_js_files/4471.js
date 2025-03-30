 

 
function* asyncGenerator() {
  yield new Promise(resolve => setTimeout(() => resolve('First async result'), 1000));
  yield new Promise(resolve => setTimeout(() => resolve('Second async result'), 1000));
  yield new Promise(resolve => setTimeout(() => resolve('Third async result'), 1000));
}

 
async function consumeGenerator(gen) {
  for await (const promise of gen) {
    print(await promise);
  }
}

 
const handler = {
  get(target, property) {
    if (property in target) {
      print(`Get property: ${property}`);
      return target[property];
    }
    return undefined;
  },
  set(target, property, value) {
    print(`Set property: ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

const obj = new Proxy({}, handler);

 
const uniqueKey = Symbol('uniqueKey');
obj[uniqueKey] = 'This is a unique value';

obj.a = 10;
print(obj.a);
print(obj[uniqueKey]);

 
(async () => {
  const gen = asyncGenerator();
  await consumeGenerator(gen);
})();
