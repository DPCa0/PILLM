 
const asyncOperation = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve('Data processed'), 1000);
  });
};

const handler = {
  get: (target, property) => {
    if (property === 'dynamicProp') {
      return `Dynamic: ${new Date().toLocaleTimeString()}`;
    }
    return target[property];
  },
};

const targetObject = {
  name: 'Proxy Test',
  [Symbol('id')]: 1,
};

const proxiedObject = new Proxy(targetObject, handler);

(async function main() {
  try {
    const result = await asyncOperation();
    print(result);

     
    const symbolKeys = Object.getOwnPropertySymbols(targetObject);
    print(`Symbol Key: ${symbolKeys[0].toString()}`);

     
    print(proxiedObject.name);
    print(proxiedObject.dynamicProp);

     
    const promiseHandler = {
      get: (target, prop) => {
        return target[prop];
      },
    };

    const promise = new Promise((resolve) => resolve('Resolved with Proxy'));
    const proxiedPromise = new Proxy(promise, promiseHandler);

    proxiedPromise.then(console.log);
  } catch (error) {
    console.error('Error:', error);
  }
})();
