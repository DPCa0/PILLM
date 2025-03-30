 

class DataFetcher {
  constructor() {
    this.cache = new Map();
    this.proxy = new Proxy(this.cache, {
      get: (target, prop) => {
        if (target.has(prop)) {
          print(`Fetching ${prop} from cache.`);
          return Promise.resolve(target.get(prop));
        } else {
          print(`Fetching ${prop} from network.`);
          return this.fetchData(prop);
        }
      }
    });
  }

  async fetchData(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      this.cache.set(url, data);
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
}

(async function () {
  const fetcher = new DataFetcher();
  
  try {
    const data1 = await fetcher.proxy['https://jsonplaceholder.typicode.com/posts/1'];
    print('Data 1:', data1);
    
    const data2 = await fetcher.proxy['https://jsonplaceholder.typicode.com/posts/1'];
    print('Data 2:', data2);
    
    const data3 = await fetcher.proxy['https://jsonplaceholder.typicode.com/posts/2'];
    print('Data 3:', data3);
  } catch (error) {
    console.error('Operation failed:', error);
  }
})();
