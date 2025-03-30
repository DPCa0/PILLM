 

 
const fetchData = async (url) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: `Data from ${url}` });
    }, 1000);
  });
};

 
const getData = async (urls) => {
  const promises = urls.map(async (url) => {
    const response = await fetchData(url);
    return response.data;
  });
  return Promise.all(promises);
};

 
const handler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Accessed property: ${prop}`);
      return target[prop];
    }
    return `Property ${prop} does not exist`;
  }
};

 
(async () => {
  const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
  const results = await getData(urls);
  
   
  const [first, second] = results;
  print(`Fetched results: ${first}, ${second}`);

   
  const dataStore = {
    firstResult: first,
    secondResult: second
  };

  const proxiedDataStore = new Proxy(dataStore, handler);

   
  print(proxiedDataStore.firstResult);
  print(proxiedDataStore.secondResult);
  print(proxiedDataStore.nonExistentProperty);
})();
