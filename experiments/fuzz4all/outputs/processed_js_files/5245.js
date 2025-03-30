 

 
async function fetchData(url) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Data from ${url}`);
    }, 1000);
  });
}

 
function* generatorFlow(urls) {
  for (let url of urls) {
    print(`Starting fetch for ${url}`);
    yield fetchData(url);
  }
}

 
const handler = {
  get: function(target, prop, receiver) {
    print(`Intercepted call to property "${prop}"`);
    return Reflect.get(...arguments);
  }
};

 
const proxyGeneratorFlow = new Proxy(generatorFlow, handler);

 
async function processURLs(urls) {
  const iterator = proxyGeneratorFlow(urls);
  
  for (let promise of iterator) {
    const data = await promise;
    print(data);
  }
}

 
const urls = ['https://api.example.com/data1', 'https://api.example.com/data2', 'https://api.example.com/data3'];

 
processURLs(urls);
