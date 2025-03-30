 

 
const fetchData = async (resource) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() > 0.5 ? resolve(`Data from ${resource}`) : reject('Failed to fetch data');
    }, 1000);
  });
};

 
const getData = async (resource) => {
  try {
    const data = await fetchData(resource);
    print(data);
  } catch (error) {
    console.error(error);
  }
};

 
const handler = {
  get: (target, prop, receiver) => {
    if (prop in target) {
      print(`Accessed property: ${prop}`);
      return Reflect.get(target, prop, receiver);
    } else {
      print(`Property "${prop}" not found`);
      return undefined;
    }
  },
  set: (target, prop, value) => {
    print(`Setting property "${prop}" to "${value}"`);
    return Reflect.set(target, prop, value);
  },
};

 
const targetObject = { name: 'Advanced JS', version: '1.0' };
const proxyObject = new Proxy(targetObject, handler);

 
proxyObject.name;
proxyObject.version = '1.1';
proxyObject.author = 'JavaScript Enthusiast';  

 
(async () => {
  await getData(proxyObject.name);
})();
