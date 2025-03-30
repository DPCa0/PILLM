const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

class DataProcessor {
  #data;

  constructor() {
    this.#data = new Map();
  }

  async loadData(url) {
    try {
      const rawData = await fetchData(url);
      rawData.forEach((item, index) => this.#data.set(index, { ...item, processed: true }));
    } catch (error) {
      console.error(`Error loading data: ${error}`);
    }
  }

  *filteredData(predicate) {
    for (const [key, value] of this.#data) {
      if (predicate(value)) yield { key, value };
    }
  }

  static async *lazyProcess(url, processorFn) {
    const processor = new DataProcessor();
    await processor.loadData(url);
    for (const { key, value } of processor.filteredData(item => item.processed)) {
      yield processorFn(key, value);
    }
  }
}

(async () => {
  const url = 'https://api.example.com/data';
  const processorFn = (key, value) => ({ id: key, details: value });
  
  for await (const processedItem of DataProcessor.lazyProcess(url, processorFn)) {
    print(processedItem);
  }
})();
