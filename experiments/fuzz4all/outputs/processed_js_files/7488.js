 

class DataFetcher {
  constructor() {
    this.cache = new Map();
  }

  async fetchData(url) {
    if (this.cache.has(url)) {
      print('Returning cached data');
      return this.cache.get(url);
    }
    try {
      let response = await fetch(url);
      let data = await response.json();
      this.cache.set(url, data);
      print('Fetched new data');
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
}

const loggingHandler = {
  get: function(target, prop) {
    print(`Property accessed: ${prop}`);
    if (typeof target[prop] === 'function') {
      return function(...args) {
        print(`Called: ${prop}(${args})`);
        return target[prop](...args);
      };
    }
    return target[prop];
  }
};

const fetcherProxy = new Proxy(new DataFetcher(), loggingHandler);

(async () => {
  const dataUrl = 'https://jsonplaceholder.typicode.com/todos/1';

  try {
    const data = await fetcherProxy.fetchData(dataUrl);
    print('Data received:', data);
  } catch (error) {
    console.error('Error:', error);
  }
  
  try {
    const cachedData = await fetcherProxy.fetchData(dataUrl);
    print('Cached Data:', cachedData);
  } catch (error) {
    console.error('Error:', error);
  }
})();
