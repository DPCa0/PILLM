class AsyncCache {
  constructor(fetchFunc) {
    this.cache = new Map();
    this.fetchFunc = fetchFunc;
  }

  async get(key) {
    if (!this.cache.has(key)) {
      this.cache.set(key, this.fetchFunc(key));
    }
    try {
      return await this.cache.get(key);
    } catch (error) {
      this.cache.delete(key);
      throw error;
    }
  }
}

function debounce(func, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const fibGen = fibonacci();

const asyncCache = new AsyncCache(async (key) => {
   
  await new Promise(res => setTimeout(res, 500));
  return fibGen.next().value;
});

const debouncedLog = debounce(console.log, 300);

(async () => {
  for (let i = 0; i < 10; i++) {
    asyncCache.get(i).then(debouncedLog).catch(console.error);
  }
})();
