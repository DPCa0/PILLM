 

const secretKey = Symbol('secret');

 
const handler = {
  get(target, property, receiver) {
    print(`Accessed property: ${property.toString()}`);
    return Reflect.get(target, property, receiver);
  },
  set(target, property, value, receiver) {
    print(`Set property: ${property.toString()} to ${value}`);
    return Reflect.set(target, property, value, receiver);
  }
};

 
const targetObject = {
  [secretKey]: 'TopSecret123',
  name: 'JavaScript',
  version: 'ES2023'
};

 
const proxyObject = new Proxy(targetObject, handler);

async function fetchData() {
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve('Data fetched after 2 seconds');
    }, 2000);
  });

  const result = await promise;
  print(result);
}

 
print(proxyObject.name);
proxyObject.version = 'ESNext';

 
print(`Secret Key Value: ${proxyObject[secretKey]}`);

 
fetchData();
