 

class DataFetcher {
  constructor(url) {
    this.url = url;
    this.cache = new Map();
  }

  async fetchData(endpoint) {
    if (this.cache.has(endpoint)) {
      print('Returning cached data for:', endpoint);
      return this.cache.get(endpoint);
    }
    
    print('Fetching data from:', endpoint);
    const response = await fetch(`${this.url}${endpoint}`);
    const data = await response.json();
    
    this.cache.set(endpoint, data);
    return data;
  }
}

 
const fetcherProxy = new Proxy(new DataFetcher('https://jsonplaceholder.typicode.com'), {
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    } else {
      return async () => {
        print(`Custom behavior for non-existent method: ${prop}`);
        return `No data available for ${prop}`;
      };
    }
  }
});

 
(async () => {
  const fetchDataModule = await import('./fetchDataModule.js');
  const result1 = await fetchDataModule.fetchData('/posts');
  print('Fetched posts:', result1);

  const result2 = await fetcherProxy.fetchData('/users');
  print('Fetched users:', result2);
  
  const result3 = await fetcherProxy.nonExistentMethod();
  print(result3);
})();
