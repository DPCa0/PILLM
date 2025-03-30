 

 
const fetchData = (url) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Data from ${url}`);
    }, 1000);
  });
};

 
function* createDataFetcher(urls) {
  for (const url of urls) {
    yield fetchData(url);
  }
}

 
async function processUrls(urls) {
  const fetcher = createDataFetcher(urls);
  for (const futureData of fetcher) {
    print(await futureData);
  }
}

 
const handler = {
  get: (target, prop) => {
    print(`Getting property: ${prop}`);
    return target[prop];
  },
  set: (target, prop, value) => {
    print(`Setting property: ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
};

const dataProxy = new Proxy({ message: 'Hello', count: 0 }, handler);

 
dataProxy.message = 'World';
print(dataProxy.message);
dataProxy.count++;

 
processUrls(['https://api.example.com/data1', 'https://api.example.com/data2']);
