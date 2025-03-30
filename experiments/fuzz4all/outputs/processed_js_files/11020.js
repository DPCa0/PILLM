class AsyncHandler {
  async *fetchData(urls) {
    for (const url of urls) {
      yield fetch(url).then(res => res.json());
    }
  }
}

class DynamicDataProcessor {
  #privateData = [];

  constructor(dataSource) {
    this.dataSource = dataSource;
  }

  static [Symbol.hasInstance](instance) {
    return Array.isArray(instance.#privateData) && typeof instance.processData === 'function';
  }

  async processData() {
    const handler = new AsyncHandler();
    const urls = this.dataSource;
    const fetchedData = handler.fetchData(urls);

    for await (const data of fetchedData) {
      this.#privateData.push(...Object.entries(data));
    }

    const processed = this.#privateData.reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});

    return processed;
  }
}

 
const urls = ['https://jsonplaceholder.typicode.com/posts/1', 'https://jsonplaceholder.typicode.com/posts/2'];

(async () => {
  const processor = new DynamicDataProcessor(urls);
  if (processor instanceof DynamicDataProcessor) {
    const result = await processor.processData();
    print(result);
  }
})();
