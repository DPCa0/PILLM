class AsyncCache {
  constructor(fetchFunction) {
    this.fetchFunction = fetchFunction;
    this.cache = new Map();
    this.listeners = new Map();
  }

  async get(key) {
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }

    if (this.listeners.has(key)) {
      return new Promise(resolve => {
        this.listeners.get(key).push(resolve);
      });
    }

    this.listeners.set(key, []);
    
    try {
      const value = await this.fetchFunction(key);
      this.cache.set(key, value);
      this.listeners.get(key).forEach(resolve => resolve(value));
    } finally {
      this.listeners.delete(key);
    }

    return this.cache.get(key);
  }
}

async function delayedFetch(key) {
  return new Promise(resolve => {
    setTimeout(() => resolve(`Value for ${key}`), Math.random() * 2000);
  });
}

const cache = new AsyncCache(delayedFetch);

 
async function run() {
  const keys = ['a', 'b', 'c', 'a'];
  const promises = keys.map(async key => {
    const value = await cache.get(key);
    print(`Key: ${key}, Value: ${value}`);
  });

  await Promise.all(promises);
}

run();
