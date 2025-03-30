 

class DataFetcher {
  constructor(urls) {
    this.urls = urls;
  }

  async fetchData() {
    const fetchPromises = this.urls.map(url => fetch(url).then(response => response.json()));
    const results = await Promise.all(fetchPromises);
    return results;
  }

  static processResults(results) {
    return results.map(({ title, body }) => ({ title, summary: body.slice(0, 100) }));
  }
}

(async () => {
  const urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2',
  ];

  const fetcher = new DataFetcher(urls);
  const data = await fetcher.fetchData();
  const processedData = DataFetcher.processResults(data);

  print(...processedData);
})();
