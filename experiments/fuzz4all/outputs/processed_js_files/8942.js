 
class DataFetcher {
  constructor(baseURL) {
    this.baseURL = baseURL;
    this.cache = new Map();
    this.proxy = new Proxy(this, {
      get(target, prop) {
        if (prop in target) {
          return target[prop];
        } else {
          console.warn(`Property "${prop}" does not exist on DataFetcher`);
          return () => Promise.resolve(`Default handler: No action for "${prop}"`);
        }
      }
    });
  }

  async fetchData(endpoint) {
    if (this.cache.has(endpoint)) {
      print('Fetching from cache:', endpoint);
      return this.cache.get(endpoint);
    }
    try {
      print('Fetching from network:', endpoint);
      const response = await fetch(`${this.baseURL}${endpoint}`);
      const data = await response.json();
      this.cache.set(endpoint, data);
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      throw new Error('Failed to fetch data');
    }
  }

  async processData(endpoint) {
    try {
      const data = await this.proxy.fetchData(endpoint);
      print('Data processed:', data);
      return data;
    } catch (error) {
      console.error('Processing error:', error);
    }
  }
}

 
(async () => {
  const api = new DataFetcher('https://jsonplaceholder.typicode.com');
  await api.proxy.processData('/todos/1');
  await api.proxy.processData('/todos/1');  
  await api.proxy.nonExistentMethod();  
})();
