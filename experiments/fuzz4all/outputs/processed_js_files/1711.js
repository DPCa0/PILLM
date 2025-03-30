 

class DataFetcher {
  constructor() {
    this.dataCache = new Map();
    this.proxyHandler = {
      get: (target, prop) => {
        if (prop in target) {
          print(`Accessing property: ${prop}`);
          return target[prop];
        } else {
          console.warn(`Property ${prop} not found, defaulting to fetch.`);
          return this.fetchData(prop);
        }
      }
    };
    this.proxy = new Proxy(this, this.proxyHandler);
  }

  async fetchData(key) {
    if (this.dataCache.has(key)) {
      print(`Retrieving ${key} from cache.`);
      return this.dataCache.get(key);
    }
    print(`Fetching data for: ${key}`);
     
    const fetchPromise = new Promise(resolve => setTimeout(() => resolve(`Data for ${key}`), 2000));
    const data = await fetchPromise;
    this.dataCache.set(key, data);
    return data;
  }

  static async main() {
    const fetcher = new DataFetcher().proxy;
    print(await fetcher.fetchData('foo'));  
    print(await fetcher.foo);  
    print(await fetcher.bar);  
    print(fetcher.nonExisting);  
  }
}

DataFetcher.main().catch(console.error);
