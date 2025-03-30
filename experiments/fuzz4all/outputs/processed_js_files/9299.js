class Fetcher {
  #cache = new Map();

  async fetchWithCache(url) {
    if (this.#cache.has(url)) {
      print('Serving from cache:', url);
      return this.#cache.get(url);
    }
    print('Fetching:', url);
    const response = await fetch(url);
    const data = await response.json();
    this.#cache.set(url, data);
    return data;
  }
}

const getJsonAsyncIterable = async function* (urls) {
  const fetcher = new Fetcher();
  for (const url of urls) {
    yield await fetcher.fetchWithCache(url);
  }
};

(async () => {
  const urls = [
    'https://jsonplaceholder.typicode.com/todos/1',
    'https://jsonplaceholder.typicode.com/todos/2',
    'https://jsonplaceholder.typicode.com/todos/1'
  ];

  try {
    for await (const jsonData of getJsonAsyncIterable(urls)) {
      print('Received data:', jsonData);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
