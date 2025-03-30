class DataProcessor {
  #data;
  
  constructor(data) {
    this.#data = data;
  }
  
  *[Symbol.iterator]() {
    for (let item of this.#data) {
      yield this.processItem(item);
    }
  }

  async processItem(item) {
     
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    await delay(100);
    
     
    const { value, ...rest } = item;
    return { processedValue: value * 2, ...rest };
  }

  static async *asyncProcess(data) {
    const processor = new DataProcessor(data);
    for await (let result of processor) {
      yield result;
    }
  }

  static async runExample() {
    const initialData = [{ value: 1 }, { value: 2 }, { value: 3 }];
    const processedData = [];

    for await (let item of DataProcessor.asyncProcess(initialData)) {
      print(item);
      processedData.push(item);
    }

     
    const results = [...processedData, { ...processedData.at(-1), extra: 'Complete' }];
    console.table(results);
  }
}

DataProcessor.runExample();
