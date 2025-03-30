class AsyncDataFetcher {
  constructor(urls) {
    this.urls = urls;
  }

  async *fetchConcurrently() {
    const promises = this.urls.map(async (url) => {
      const response = await fetch(url);
      return response.json();
    });

    for (const promise of promises) {
      yield await promise;
    }
  }
}

const processData = async (urls) => {
  const dataFetcher = new AsyncDataFetcher(urls);
  const aggregatedData = [];

  for await (const data of dataFetcher.fetchConcurrently()) {
    aggregatedData.push(data);
    print(`Fetched data: `, data);
  }

  const processedData = aggregatedData.reduce((acc, curr) => {
    return [...acc, ...curr];
  }, []);

  print(`Processed data: `, processedData);
  return processedData;
};

 
 
const mockUrls = [
  'https://api.mock.com/data1',
  'https://api.mock.com/data2',
  'https://api.mock.com/data3'
];

processData(mockUrls);
