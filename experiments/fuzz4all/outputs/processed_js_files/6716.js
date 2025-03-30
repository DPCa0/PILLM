 

 
async function fetchData(url) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Data from ${url}`), 1000);
  });
}

 
function* urlGenerator() {
  yield 'https://api.example.com/data1';
  yield 'https://api.example.com/data2';
  yield 'https://api.example.com/data3';
}

 
const loggingHandler = {
  get(target, prop) {
    print(`Getting property '${prop}'`);
    return target[prop];
  },
  set(target, prop, value) {
    print(`Setting property '${prop}' to '${value}'`);
    target[prop] = value;
    return true;
  }
};

 
const dataStore = {};

 
const proxiedDataStore = new Proxy(dataStore, loggingHandler);

 
async function processURLs(urlGen) {
  for (let url of urlGen) {
    const data = await fetchData(url);
    proxiedDataStore[url] = data;  
  }
}

 
(async function main() {
  const urls = urlGenerator();
  await processURLs(urls);

   
  print('Final data store:', proxiedDataStore);
})();
