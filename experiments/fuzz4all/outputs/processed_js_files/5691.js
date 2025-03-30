 

 
const fetchData = (url) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (url) resolve(`Data from ${url}`);
    else reject(new Error('Invalid URL'));
  }, 1000);
});

 
async function* dataFetcher(urls) {
  for (const url of urls) {
    yield await fetchData(url).catch(err => `Error: ${err.message}`);
  }
}

 
const dataProxyHandler = {
  get: (target, prop, receiver) => {
    print(`Accessed property "${prop}" with value:`, target[prop]);
    return Reflect.get(target, prop, receiver);
  },
  set: (target, prop, value, receiver) => {
    print(`Updated property "${prop}" to value:`, value);
    return Reflect.set(target, prop, value, receiver);
  }
};

 
(async () => {
  const urls = ['https://api.example.com/data1', 'https://api.example.com/data2', ''];
  const dataGen = dataFetcher(urls);

  const data = {};
  const proxyData = new Proxy(data, dataProxyHandler);

  for await (const content of dataGen) {
    const urlKey = `url${Object.keys(proxyData).length + 1}`;
    proxyData[urlKey] = content;
  }

  print('Final Data:', proxyData);
})();
