(async () => {
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  const memoize = fn => {
    const cache = new Map();
    return async (...args) => {
      const key = JSON.stringify(args);
      if (cache.has(key)) {
        return cache.get(key);
      }
      const result = await fn(...args);
      cache.set(key, result);
      return result;
    };
  };

  const getRandomData = async () => {
    await delay(1000);
    return Math.random();
  };

  const memoizedGetRandomData = memoize(getRandomData);

  class DataFetcher {
    constructor() {
      this.data = null;
    }

    async fetchData() {
      try {
        this.data = await memoizedGetRandomData();
        print(`Fetched Data: ${this.data}`);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    async retryFetch(retries = 3) {
      for (let i = 0; i < retries; i++) {
        await this.fetchData();
        if (this.data !== null) break;
        print(`Retrying fetch... Attempt ${i + 2}`);
      }
    }
  }

  const proxyHandler = {
    get(target, property) {
      if (property in target) {
        print(`Accessing property '${property}'`);
        return target[property];
      }
      throw new Error(`Property '${property}' does not exist.`);
    },
    set(target, property, value) {
      print(`Setting property '${property}' to '${value}'`);
      target[property] = value;
      return true;
    }
  };

  const fetcher = new Proxy(new DataFetcher(), proxyHandler);
  await fetcher.retryFetch();
})();
