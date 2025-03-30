class AsyncCache {
  constructor() {
    this.cache = new Map();
  }

  async fetch(key, fetchFunction) {
    if (this.cache.has(key)) {
      print(`Cache hit for key: ${key}`);
      return this.cache.get(key);
    }
    
    print(`Cache miss for key: ${key}. Fetching...`);
    const result = await fetchFunction();
    this.cache.set(key, result);
    return result;
  }

  clear() {
    this.cache.clear();
  }
}

 
const fetchData = async (key) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Data for ${key}`), 1000);
  });
};

 
(async () => {
  const cache = new AsyncCache();

  const key = 'item1';
  
   
  const result1 = await cache.fetch(key, () => fetchData(key));
  print(result1);  

   
  const result2 = await cache.fetch(key, () => fetchData(key));
  print(result2);  

  cache.clear();
})();
