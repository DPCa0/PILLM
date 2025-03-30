 
const fetchData = async (url) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Data from ${url}`), 1000);
  });
};

 
const loggerHandler = {
  get: (target, property) => {
    print(`Property '${property}' accessed.`);
    return target[property];
  }
};

 
class DataFetcher {
  #url;
  
  constructor(url) {
    this.#url = url;
  }

  async #fetch() {
    return await fetchData(this.#url);
  }
  
  async getData() {
    return await this.#fetch();
  }
}

 
const logData = (...data) => {
  print(`Fetched data: ${data.join(', ')}`);
};

 
(async () => {
  const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
  const fetchers = urls.map(url => new Proxy(new DataFetcher(url), loggerHandler));

  const results = await Promise.all(fetchers.map(fetcher => fetcher.getData()));
  const [firstResult, ...restResults] = results;

  logData(firstResult, ...restResults);
})();
