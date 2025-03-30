 

 
const operationSymbol = Symbol('operation');

 
const fetchData = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, value: Math.random() * 100 });
    }, 1000);
  });
};

 
const handler = {
  get(target, property, receiver) {
    if (property === 'performOperation' && typeof target[property] === 'function') {
      return (...args) => {
        print('Intercepted call to performOperation');
        return Reflect.apply(target[property], receiver, args);
      };
    }
    return Reflect.get(target, property, receiver);
  },
};

 
const complexObject = {
  [operationSymbol]: 'Random Multiplication',
  async performOperation(id) {
    const data = await fetchData(id);
    print(`Operation: ${this[operationSymbol]}`);
    print(`Data fetched for ID ${id}:`, data);
    return data.value * Math.PI;
  },
};

 
const proxiedObject = new Proxy(complexObject, handler);

 
(async () => {
  try {
    const result = await proxiedObject.performOperation(42);
    print('Result of the operation:', result.toFixed(2));
  } catch (error) {
    console.error('Error performing operation:', error);
  }
})();
