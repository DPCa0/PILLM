 

 
const fetchData = (url) => new Promise((resolve) => {
  setTimeout(() => {
    resolve({ data: `Data from ${url}` });
  }, 1000);
});

 
async function getData(url) {
  print(`Fetching from ${url}...`);
  const response = await fetchData(url);
  return response.data;
}

 
const handler = {
  apply: (target, thisArg, args) => {
    print(`Called getData with arguments: ${args}`);
    return Reflect.apply(target, thisArg, args)
      .then((data) => {
        print(`Processing data: ${data}`);
        return data.toUpperCase();
      });
  }
};

const proxiedGetData = new Proxy(getData, handler);

 
(async function() {
  const urls = ['https://api.example.com/endpoint1', 'https://api.example.com/endpoint2'];
  const results = await Promise.all(urls.map(proxiedGetData));
  print('Results:', results);
})();
