class AsyncIterableQueue {
  constructor() {
    this._queue = [];
    this._resolvers = [];
  }

  enqueue(item) {
    if (this._resolvers.length) {
      const resolve = this._resolvers.shift();
      resolve({ done: false, value: item });
    } else {
      this._queue.push(item);
    }
  }

  async *[Symbol.asyncIterator]() {
    while (true) {
      if (this._queue.length) {
        yield this._queue.shift();
      } else {
        yield await new Promise((resolve) => this._resolvers.push(resolve));
      }
    }
  }
}

const fetchDataConcurrently = async (urls) => {
  const queue = new AsyncIterableQueue();
  const fetchWithTimeout = (url, ms = 5000) =>
    Promise.race([
      fetch(url).then((response) => response.json()),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), ms)),
    ]);

  urls.forEach(async (url) => {
    try {
      const data = await fetchWithTimeout(url);
      queue.enqueue(data);
    } catch (error) {
      queue.enqueue({ error: `Failed to fetch ${url}: ${error.message}` });
    }
  });

  for await (const result of queue) {
    print(result);
    if (Object.keys(result).includes('error')) break;
  }
};

const urls = [
  'https://jsonplaceholder.typicode.com/posts/1',
  'https://jsonplaceholder.typicode.com/posts/2',
  'https://jsonplaceholder.typicode.com/posts/invalid',
];

fetchDataConcurrently(urls);
