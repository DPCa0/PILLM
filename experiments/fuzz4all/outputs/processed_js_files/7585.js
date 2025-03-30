class NetworkRequest {
  constructor(url) {
    this.url = url;
  }

  async fetchData() {
    const response = await fetch(this.url);
    return response.json();
  }

  static async fetchMultiple(urls) {
    return Promise.all(urls.map(url => new NetworkRequest(url).fetchData()));
  }
}

const processData = async () => {
  const urls = [
    'https://api.example.com/data1',
    'https://api.example.com/data2',
    'https://api.example.com/data3'
  ];

  try {
    const results = await NetworkRequest.fetchMultiple(urls);
    const transformedData = results.map(data => ({
      ...data,
      fetchedAt: new Date().toISOString()
    }));

    const aggregatedData = transformedData.reduce((acc, data) => {
      acc.total += data.value;
      return acc;
    }, { total: 0 });

    print(`Aggregated total: ${aggregatedData.total}`);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

processData();

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
(async () => {
  const iterableData = [1, 2, 3, 4, 5];

  async function* asyncGenerator(data) {
    for (const item of data) {
      await delay(500);  
      yield item * 2;
    }
  }

  for await (const value of asyncGenerator(iterableData)) {
    print('Processed value:', value);
  }
})();
