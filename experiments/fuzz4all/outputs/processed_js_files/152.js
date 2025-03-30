class AsyncDataProcessor {
  constructor(urls) {
    this.urls = urls;
  }

  async fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch data from ${url}`);
    return response.json();
  }

  async *dataGenerator() {
    for (const url of this.urls) {
      yield await this.fetchData(url);
    }
  }

  async processData() {
    const results = [];
    try {
      for await (const data of this.dataGenerator()) {
        results.push(this.complexDataTransformation(data));
      }
    } catch (error) {
      console.error('Error processing data:', error);
    }
    return results;
  }

  complexDataTransformation(data) {
     
    const transformedData = structuredClone(data);

     
    return Object.entries(transformedData).reduce((acc, [key, value]) => {
      acc[key.toUpperCase()] = typeof value === 'string' ? value.toLowerCase() : value;
      return acc;
    }, {});
  }

  static async run(urls) {
    const processor = new AsyncDataProcessor(urls);
    const processedData = await processor.processData();
    print('Processed Data:', processedData);
  }
}

const urls = ['https://jsonplaceholder.typicode.com/posts/1', 'https://jsonplaceholder.typicode.com/posts/2'];
AsyncDataProcessor.run(urls);
