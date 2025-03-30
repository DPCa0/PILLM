 

 
const fetchData = async (url) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Data from ${url}`), 1000);
  });
};

 
async function* dataFetcher(urls) {
  for (const url of urls) {
    yield await fetchData(url);
  }
}

 
const dataLogger = (target) => {
  return new Proxy(target, {
    get(obj, prop) {
      print(`Accessing property "${prop}"`);
      return prop in obj ? obj[prop] : undefined;
    }
  });
};

 
(async () => {
  const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
  const dataProxy = dataLogger([]);

  for await (const data of dataFetcher(urls)) {
    dataProxy.push(data);
  }

   
  print(dataProxy[0]);
  print(dataProxy[1]);
})();
