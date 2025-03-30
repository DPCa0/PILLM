 

 
function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { url: url, content: "This is the data from " + url };
      resolve(data);
    }, 1000);
  });
}

 
function* dataFetcher(urls) {
  for (let url of urls) {
    yield fetchData(url);
  }
}

 
async function handleData(urls) {
  const generator = dataFetcher(urls);
  const results = [];

  for (let promise of generator) {
    const data = await promise;
    print("Fetched:", data);
    results.push(data);
  }

  return results;
}

 
const resultsHandler = {
  get(target, prop) {
    if (typeof target[prop] === "function") {
      return function (...args) {
        print(`Called ${prop} with`, args);
        return target[prop].apply(target, args);
      };
    } else {
      print(`Accessed property ${prop}`);
      return target[prop];
    }
  },
};

 
const urls = ["http://api.example.com/data1", "http://api.example.com/data2"];

 
(async () => {
  const results = await handleData(urls);
  const proxiedResults = new Proxy(results, resultsHandler);

   
  print(proxiedResults.length);
  proxiedResults.push({ url: "http://api.example.com/data3", content: "Cached data" });
  print(proxiedResults[0]);
})();
