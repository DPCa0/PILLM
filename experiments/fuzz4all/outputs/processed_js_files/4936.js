class AsyncCache {
  constructor() {
    this.cache = new Map();
  }

  async getData(key, fetchFunction) {
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }

    if (!this.cache.get(key)) {
      this.cache.set(key, fetchFunction());
    }

    try {
      const data = await this.cache.get(key);
      this.cache.set(key, data);
      return data;
    } catch (err) {
      this.cache.delete(key);
      throw err;
    }
  }
}

const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const cache = new AsyncCache();

(async () => {
  const urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2',
    'https://jsonplaceholder.typicode.com/posts/1',
  ];

  const results = await Promise.all(
    urls.map(async (url) => {
      try {
        const data = await cache.getData(url, () => fetchData(url));
        print(`Data from ${url}:`, data);
      } catch (err) {
        console.error(`Error fetching data from ${url}:`, err);
      }
    })
  );

  print('All fetches complete', results);
})();
