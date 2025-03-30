class AsyncDataFetcher {
  constructor(url) {
    this.url = url;
  }

  async fetchData() {
    try {
      const response = await fetch(this.url);
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  }
}

class DataProcessor {
  #data;
  constructor(data) {
    this.#data = data;
  }

  process() {
    return this.#data
      .map(item => ({ ...item, processed: true }))
      .filter(item => item.value > 10);
  }

  *[Symbol.iterator]() {
    for (let item of this.#data) {
      yield item;
    }
  }
}

(async () => {
  const url = 'https://api.example.com/data';
  const fetcher = new AsyncDataFetcher(url);
  const data = await fetcher.fetchData();

  const processor = new DataProcessor(data);
  const processedData = processor.process();

  for (const item of processor) {
    print(item);
  }

  print('Processed Data:', processedData);
})();
