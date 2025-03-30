 

const handler = {
  get(target, prop, receiver) {
    if (prop in target) {
      print(`Getting the property '${prop}'`);
      return Reflect.get(...arguments);
    } else {
      return `Property '${prop}' doesn't exist`;
    }
  },
  set(target, prop, value) {
    print(`Setting the property '${prop}' to '${value}'`);
    return Reflect.set(...arguments);
  }
};

const createDelayedPromise = (timeout, value) => {
  return new Promise(resolve => setTimeout(() => resolve(value), timeout));
};

const fetchData = async () => {
  const delayedValue1 = await createDelayedPromise(1000, 10);
  const delayedValue2 = await createDelayedPromise(1500, 20);
  return { delayedValue1, delayedValue2 };
};

(async () => {
  let data = await fetchData();
  
  const proxy = new Proxy(data, handler);

  // Accessing existing and non-existing properties.
  print(proxy.delayedValue1); // Access existing property
  print(proxy.nonExistentProp); // Access non-existing property

  // Setting new values
  proxy.delayedValue2 = 30;
  print(proxy.delayedValue2);

  // Using Reflect to access properties
  print(Reflect.get(proxy, 'delayedValue1'));
  Reflect.set(proxy, 'newProp', 40);
  print(proxy.newProp);
})();
