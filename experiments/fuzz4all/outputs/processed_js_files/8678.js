 
const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: 'Hello, world!' });
    }, 1000);
  });
};

 
const handler = {
  get: (target, property) => {
    print(`Getting ${property}`);
    return target[property];
  },
  set: (target, property, value) => {
    print(`Setting ${property} to ${value}`);
    target[property] = value;
    return true;
  },
};

const targetObject = { message: '' };
const proxy = new Proxy(targetObject, handler);

 
const asyncIterable = {
  [Symbol.asyncIterator]: async function* () {
    const data = await fetchData();
    yield data.data;
  },
};

 
(async () => {
  for await (let message of asyncIterable) {
    proxy.message = message;  
    print(proxy.message);
  }
})();
