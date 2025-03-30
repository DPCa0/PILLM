 

 
const loggerHandler = {
  get(target, property) {
    if (typeof target[property] === 'function') {
      return function (...args) {
        print(`Method ${property} called with arguments: ${args}`);
        return target[property](...args);
      };
    }
    return target[property];
  }
};

const obj = {
  async fetchData(url) {
    const response = await fetch(url);
    return response.json();
  }
};

const proxyObj = new Proxy(obj, loggerHandler);

 
async function* dataGenerator(urls) {
  for (const url of urls) {
    yield await proxyObj.fetchData(url);
  }
}

 
async function run() {
  const urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2'
  ];

  for await (const data of dataGenerator(urls)) {
    print('Received Data:', data);
  }
}

run();
