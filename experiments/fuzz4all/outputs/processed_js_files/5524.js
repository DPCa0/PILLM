 

 
const uniqueKey = Symbol('uniqueKey');

 
const handler = {
  get: (target, prop, receiver) => {
    print(`Property '${String(prop)}' accessed.`);
    return Reflect.get(target, prop, receiver);
  },
  set: (target, prop, value, receiver) => {
    print(`Property '${String(prop)}' set to '${value}'.`);
    return Reflect.set(target, prop, value, receiver);
  }
};

const targetObject = {
  [uniqueKey]: 'Hidden value',
  regularProperty: 'Initial value'
};

const proxy = new Proxy(targetObject, handler);

 
function* generatePromises() {
  yield new Promise(resolve => setTimeout(() => resolve('First promise resolved'), 1000));
  yield new Promise(resolve => setTimeout(() => resolve('Second promise resolved'), 500));
  yield new Promise(resolve => setTimeout(() => resolve('Third promise resolved'), 1500));
}

 
async function handleGenerator(gen) {
  for (const promise of gen) {
    const result = await promise;
    print(result);
  }
}

 
print(proxy.regularProperty);
proxy.regularProperty = 'Updated value';
print(proxy[uniqueKey]);

 
const promiseGen = generatePromises();
handleGenerator(promiseGen);
