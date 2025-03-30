 
const fetchData = async () => {
   
  return new Promise((resolve) =>
    setTimeout(() => resolve('Fetched Data'), 1000)
  );
};

 
const handler = {
  get: (target, prop) => {
    print(`Getting property '${prop}'`);
    return target[prop];
  },
  set: (target, prop, value) => {
    print(`Setting property '${prop}' to '${value}'`);
    target[prop] = value;
    return true;
  },
};

const targetObject = { key: 'initial value' };
const proxyObject = new Proxy(targetObject, handler);

 
class AdvancedClass {
  #privateField = 'private data';

  #privateMethod() {
    print('Accessing private method.');
    return this.#privateField;
  }

  accessPrivateData() {
    print('Accessing private field through a public method.');
    return this.#privateMethod();
  }
}

 
async function* asyncGenerator() {
  for (let i = 0; i < 3; i++) {
    yield await fetchData();
  }
}

(async () => {
   
  proxyObject.key = 'new value';
  print(proxyObject.key);

   
  const advancedInstance = new AdvancedClass();
  print(advancedInstance.accessPrivateData());

   
  for await (const data of asyncGenerator()) {
    print(`Async generator yielded: ${data}`);
  }
})();
