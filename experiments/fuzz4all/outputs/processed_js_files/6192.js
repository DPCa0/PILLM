 

const asyncOperation = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve('Async Operation Completed'), 1000);
  });
};

const handler = {
  get: (target, property) => {
    if (property in target) {
      print(`Getting value of ${property}`);
      return Reflect.get(target, property);
    }
    return `Property ${property} does not exist`;
  },
  set: (target, property, value) => {
    print(`Setting value of ${property} to ${value}`);
    return Reflect.set(target, property, value);
  }
};

const createProxy = (object) => new Proxy(object, handler);

const run = async () => {
  const proxyObj = createProxy({ message: 'Initial Message' });

  print(proxyObj.message);  
  proxyObj.message = 'Updated Message';  

  const result = await asyncOperation();
  print(result);
};

run();
