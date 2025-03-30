class AsyncDataProcessor {
  constructor(urls) {
    this.urls = urls;
  }

  async fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch data from ${url}`);
    return response.json();
  }

  process(data) {
     
    return data.filter(user => user.age > 30);
  }

  async *asyncDataGenerator() {
    for (const url of this.urls) {
      try {
        const data = await this.fetchData(url);
        yield this.process(data);
      } catch (error) {
        console.error(error);
      }
    }
  }

  async execute() {
    const results = [];
    for await (const processedData of this.asyncDataGenerator()) {
      results.push(...processedData);
    }
    print("Processed Data:", results);
  }
}

const urls = [
  "https://api.example.com/data1.json",
  "https://api.example.com/data2.json",
  "https://api.example.com/data3.json"
];

const dataProcessor = new AsyncDataProcessor(urls);
dataProcessor.execute();
