class AsyncCache {
  constructor(fetchFunction) {
    this.fetchFunction = fetchFunction;
    this.cache = new Map();
  }
  
  async get(key) {
    if (this.cache.has(key)) {
      print(`Cache hit for key: ${key}`);
      return this.cache.get(key);
    }
    print(`Cache miss for key: ${key}`);
    const value = await this.fetchFunction(key);
    this.cache.set(key, value);
    return value;
  }
}

const complexFetch = (key) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() > 0.2) {
      resolve(`Fetched value for ${key}`);
    } else {
      reject(`Failed to fetch ${key}`);
    }
  }, 1000);
});

(async function demo() {
  const cache = new AsyncCache(complexFetch);

  const keys = ['a', 'b', 'c'];
  await Promise.all(keys.map(async (key) => {
    try {
      const value = await cache.get(key);
      print(value);
    } catch (error) {
      console.error(error);
    }
  }));

  print('Second round: Testing cache hits.');
  
  for (const key of keys) {
    try {
      const value = await cache.get(key);
      print(value);
    } catch (error) {
      console.error(error);
    }
  }
})();
