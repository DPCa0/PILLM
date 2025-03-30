class DataFetcher {
  constructor(url) {
    this.url = url;
  }

  async *fetchData() {
    const response = await fetch(this.url);
    const data = await response.json();
    yield* data.results;
  }
}

async function processResults(results) {
  const promises = results.map(async ({ id }) => {
    const fetchedData = await simulateAsyncProcessing(id);
    print(`Processed ID: ${id}, Result: ${fetchedData}`);
    return fetchedData;
  });
  
  return await Promise.all(promises);
}

async function simulateAsyncProcessing(id) {
  return new Promise(resolve => setTimeout(() => resolve(`data-${id}`), Math.random() * 1000));
}

(async () => {
  const fetcher = new DataFetcher('https://api.example.com/data');
  let results = [];
  
  for await (const data of fetcher.fetchData()) {
    results.push(data);
  }

  const processedData = await processResults(results);
  print('All data processed:', processedData);
})();
