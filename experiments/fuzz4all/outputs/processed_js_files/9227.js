 

class DataFetcher {
  constructor() {
    this.cache = new Map();
    this.fetchWithCache = this.createFetcherProxy(this.fetchData.bind(this));
  }

  createFetcherProxy(fetchFunc) {
    return new Proxy(fetchFunc, {
      apply: async (target, thisArg, args) => {
        const url = args[0];
        if (this.cache.has(url)) {
          print('Returning cached data for:', url);
          return this.cache.get(url);
        }
        print('Fetching new data for:', url);
        const data = await target.apply(thisArg, args);
        this.cache.set(url, data);
        return data;
      }
    });
  }

  async fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  }
}

(async () => {
  const urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2',
    'https://jsonplaceholder.typicode.com/posts/1'  
  ];

  const dataFetcher = new DataFetcher();
  const dataPromises = urls.map(url => dataFetcher.fetchWithCache(url));

   
  const results = await Promise.allSettled(dataPromises);

   
  const uniquePostIDs = new Set();

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      const data = result.value;
      uniquePostIDs.add(data.id);
      print(`Data from URL ${index + 1}:`, data);
    } else {
      console.error(`Error fetching data from URL ${index + 1}:`, result.reason);
    }
  });

  print('Unique Post IDs:', Array.from(uniquePostIDs));
})();
