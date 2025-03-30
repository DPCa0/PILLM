 

 
async function fetchData(url) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Data from ${url}`);
    }, 1000);
  });
}

 
function* fetchGenerator(urls) {
  for (let url of urls) {
    yield fetchData(url);
  }
}

 
async function runGenerator(gen) {
  const iterator = gen();

  async function step({ done, value }) {
    if (!done) {
      const result = await value;
      print(result);
      return step(iterator.next());
    }
  }

  return step(iterator.next());
}

 
const loggerHandler = {
  get: (target, property) => {
    print(`Accessing property "${property}"`);
    return target[property];
  }
};

 
const uniqueKey = Symbol('uniqueKey');
const obj = {
  [uniqueKey]: 'Secret data',
  name: 'Proxy demo'
};

 
const proxyObj = new Proxy(obj, loggerHandler);

 
print(proxyObj.name);
print(proxyObj[uniqueKey]);

 
const urls = ['https://api.example.com/1', 'https://api.example.com/2'];
runGenerator(() => fetchGenerator(urls));
