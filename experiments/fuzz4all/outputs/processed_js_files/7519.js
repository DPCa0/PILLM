class AsyncCache {
  constructor(fetchFunc) {
    this.cache = new Map();
    this.fetchFunc = fetchFunc;
  }

  async get(key) {
    if (!this.cache.has(key)) {
      this.cache.set(key, this.fetchFunc(key).catch(e => {
        this.cache.delete(key);
        throw e;
      }));
    }
    return this.cache.get(key);
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function fetchWithDelay(key) {
  await delay(1000);
  return `Value for ${key}`;
}

const cachedFetcher = new AsyncCache(fetchWithDelay);

const keys = ['a', 'b', 'a', 'c', 'b'];

(async () => {
  const promises = keys.map(async (key, index) => {
    print(`Fetching ${key} at index ${index}`);
    const result = await cachedFetcher.get(key);
    print(`Result for ${key} at index ${index}: ${result}`);
  });
  
  await Promise.all(promises);
})();
