 

 
const fetchData = async (url) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Data from ${url}`), 1000);
  });
};

 
const handler = {
  get(target, property, receiver) {
    print(`Getting property '${property}'`);
    return Reflect.get(target, property, receiver);
  },
  set(target, property, value, receiver) {
    print(`Setting property '${property}' to '${value}'`);
    return Reflect.set(target, property, value, receiver);
  }
};

 
let dataProxy = new Proxy({ cache: {} }, handler);

async function fetchAndCache(url) {
  if (!dataProxy.cache[url]) {
    print(`Fetching data from: ${url}`);
    dataProxy.cache[url] = await fetchData(url);
  } else {
    print(`Retrieving cached data for: ${url}`);
  }
  return dataProxy.cache[url];
}

 
(async () => {
  const urls = ["https://api.example.com/data1", "https://api.example.com/data2"];
  
  for (const url of urls) {
    print(await fetchAndCache(url));
    print(await fetchAndCache(url));  
  }
})();
