 
class DataFetcher {
  constructor(urls) {
    this.urls = urls;
  }

  async fetchData() {
    try {
      const data = await Promise.all(this.urls.map(url => fetch(url).then(res => res.json())));
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
}

(async () => {
  const urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2',
    'https://jsonplaceholder.typicode.com/posts/3'
  ];

  const fetcher = new DataFetcher(urls);
  const results = await fetcher.fetchData();

   
  const [first, ...rest] = results;

  print('First Result:', first);
  print('Remaining Results:', ...rest);
})();
