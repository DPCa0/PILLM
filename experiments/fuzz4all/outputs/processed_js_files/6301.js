 
function logAccess(target, property, descriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args) {
    print(`Calling ${property} with args:`, args);
    const result = originalMethod.apply(this, args);
    print(`${property} returned:`, result);
    return result;
  };
  return descriptor;
}

 
const complexObject = {
  name: 'Advanced Object',
  _hiddenData: 'Secret',
};

const handler = {
  get(target, property, receiver) {
    if (property.startsWith('_')) {
      console.warn(`Access to ${property} is restricted.`);
      return undefined;
    }
    return Reflect.get(target, property, receiver);
  },
};

const proxiedObject = new Proxy(complexObject, handler);

 
const asyncFunctionSet = new Set([
  async () => {
    const result = await new Promise(resolve => setTimeout(() => resolve(1), 1000));
    print('Async operation 1 complete:', result);
    return result;
  },
  async () => {
    const result = await new Promise(resolve => setTimeout(() => resolve(2), 500));
    print('Async operation 2 complete:', result);
    return result;
  },
]);

Promise.all([...asyncFunctionSet]).then(results => print('All operations completed:', results));

 
async function* fetchItems() {
  const items = ['item1', 'item2', 'item3'];
  for (const item of items) {
    yield await new Promise(resolve => setTimeout(() => resolve(item), 1000));
  }
}

(async () => {
  for await (const item of fetchItems()) {
    print('Fetched:', item);
  }
})();

 
class AdvancedClass {
  constructor() {
    this[Symbol.for('name')] = 'Advanced';
  }

  @logAccess
  getSecretData() {
    return proxiedObject._hiddenData;
  }
}

 
const advancedInstance = new AdvancedClass();
print(proxiedObject.name);  
print(advancedInstance.getSecretData());  
