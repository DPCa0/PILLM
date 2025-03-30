class AsyncCache {
  constructor(fetchFunc) {
    this.cache = new Map();
    this.fetchFunc = fetchFunc;
  }

  async get(key) {
    if (!this.cache.has(key)) {
      this.cache.set(key, this.fetchFunc(key).catch(err => {
        this.cache.delete(key);
        throw err;
      }));
    }
    return this.cache.get(key);
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function fetchData(key) {
  await delay(1000);  
  return `Data for ${key}`;
}

const cache = new AsyncCache(fetchData);

(async () => {
  try {
    const keys = ['A', 'B', 'A', 'C', 'B'];
    const results = await Promise.all(keys.map(async (key) => {
      const data = await cache.get(key);
      return `[${key}: ${data}]`;
    }));
    print(results.join(', '));
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
