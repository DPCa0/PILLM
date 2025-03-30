class DataFetcher {
  async *fetchData(urls) {
    for (const url of urls) {
      yield fetch(url).then(response => response.json());
    }
  }
}

const processData = async () => {
  const urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2',
    'https://jsonplaceholder.typicode.com/posts/3'
  ];

  const fetcher = new DataFetcher();
  const promises = [];
  
  for await (const dataPromise of fetcher.fetchData(urls)) {
    promises.push(dataPromise);
  }

  const results = await Promise.all(promises);
  
  results.forEach(({ title, body }, index) => {
    print(`Post ${index + 1}: ${title}`);
    print(body.slice(0, 50) + '...');
  });
};

processData();
