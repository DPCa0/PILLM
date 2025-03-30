 
class DataFetcher {
  constructor() {
    this.cache = new Map();
    return new Proxy(this, {
      get: (target, prop) => {
        if (prop in target) {
          return target[prop];
        }
         
        return target.fetchData(prop);
      }
    });
  }

  async fetchData(key) {
    if (this.cache.has(key)) {
      return Promise.resolve(this.cache.get(key));
    }
    const data = await this.simulateNetworkRequest(key);
    this.cache.set(key, data);
    return data;
  }

  simulateNetworkRequest(key) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ key, data: `Data for ${key}` });
      }, Math.random() * 1000);
    });
  }
}

(async () => {
  const dataFetcher = new DataFetcher();
  const fetchPromises = ['item1', 'item2', 'item3'].map(async (item) => {
    const data = await dataFetcher[item];
    print(data);
  });

  await Promise.all(fetchPromises);
})();
