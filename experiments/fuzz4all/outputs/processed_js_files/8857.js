class AsyncDataFetcher {
  constructor(url) {
    this.url = url;
  }

  async fetchData() {
    try {
      const response = await fetch(this.url);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function* createDataStream(urls) {
  for (const url of urls) {
    await delay(1000);  
    const fetcher = new AsyncDataFetcher(url);
    yield fetcher.fetchData();
  }
}

const urls = [
  'https://jsonplaceholder.typicode.com/todos/1',
  'https://jsonplaceholder.typicode.com/todos/2',
  'https://jsonplaceholder.typicode.com/todos/3'
];

(async () => {
  for await (const dataPromise of createDataStream(urls)) {
    const data = await dataPromise;
    print('Fetched data:', data);
  }
})();
