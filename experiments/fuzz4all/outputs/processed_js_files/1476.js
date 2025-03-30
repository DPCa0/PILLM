 

 
const fetchData = (url) => new Promise((resolve) => setTimeout(() => resolve(`Data from ${url}`), 1000));

 
function* dataFlow(urls) {
  for (const url of urls) {
    yield fetchData(url);
  }
}

 
async function fetchDataInSequence(generator) {
  for (let result of generator) {
    print(await result);
  }
}

 
const fetchHandlerSymbol = Symbol('fetchHandler');

 
const fetchHandler = {
  get(target, prop) {
    print(`Accessing property: ${prop}`);
    return target[prop];
  },
  set(target, prop, value) {
    print(`Setting property: ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
};

 
const fetchController = {
  [fetchHandlerSymbol]: null
};

 
const proxy = new Proxy(fetchController, fetchHandler);

 
proxy[fetchHandlerSymbol] = dataFlow(['https://api.example.com/1', 'https://api.example.com/2', 'https://api.example.com/3']);

 
fetchDataInSequence(proxy[fetchHandlerSymbol]);
