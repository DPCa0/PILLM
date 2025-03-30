class AsyncCache {
  constructor(fetchFn, ttl = 5000) {
    this.fetchFn = fetchFn;
    this.ttl = ttl;
    this.cache = new Map();
  }

  async get(key) {
    if (this.cache.has(key) && (Date.now() - this.cache.get(key).timestamp < this.ttl)) {
      return this.cache.get(key).value;
    }
    const value = await this.fetchFn(key);
    this.cache.set(key, { value, timestamp: Date.now() });
    return value;
  }

  clearExpired() {
    const now = Date.now();
    this.cache.forEach((val, key) => {
      if (now - val.timestamp >= this.ttl) {
        this.cache.delete(key);
      }
    });
  }
}

 
(async () => {
  const fetchData = async (key) => {
    const { default: fetch } = await import('node-fetch');
    const response = await fetch(`https: 
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  };

  const cache = new AsyncCache(fetchData, 10000);

  print(await cache.get(1));
  setTimeout(() => cache.clearExpired(), 12000);
})();
