class AsyncHandler {
  constructor() {
    this.cache = new Map();
  }

  async fetchData(url) {
    if (this.cache.has(url)) {
      print('Returning cached data');
      return this.cache.get(url);
    }
    print('Fetching data from', url);
    const response = await fetch(url);
    const data = await response.json();
    this.cache.set(url, data);
    return data;
  }

  async *getData(urls) {
    for (const url of urls) {
      yield await this.fetchData(url);
    }
  }
}

const handler = new AsyncHandler();

(async () => {
  const urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2',
    'https://jsonplaceholder.typicode.com/posts/1'  
  ];

  for await (const data of handler.getData(urls)) {
    print('Received data:', data);
  }
})();
