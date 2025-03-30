class DataFetcher {
  constructor(urls) {
    this.urls = urls;
    this.data = new Map();
  }

  async *fetchData() {
    for (const url of this.urls) {
      yield fetch(url).then(res => res.json());
    }
  }

  async populateData() {
    for await (const dataPromise of this.fetchData()) {
      const data = await dataPromise;
      this.data.set(data.id, data);
    }
  }

  processData() {
    const processedData = [...this.data.values()].flatMap(({ data }) => data);
    return processedData.reduce((acc, item) => {
      acc[item.type] = (acc[item.type] || 0) + 1;
      return acc;
    }, {});
  }

  async run() {
    await this.populateData();
    const result = this.processData();
    print('Processed Data:', result);
  }
}

 
const urls = [
  'https://api.example.com/data/1',
  'https://api.example.com/data/2',
];

const dataFetcher = new DataFetcher(urls);
dataFetcher.run().catch(console.error);
