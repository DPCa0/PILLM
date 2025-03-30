class DataProcessor {
  #privateData = [];

  constructor(initialData) {
    this.#privateData = initialData;
  }

  *processData() {
    for (let item of this.#privateData) {
      yield this.#complexOperation(item);
    }
  }

  #complexOperation(item) {
    const { key, value } = item;
    return { [key]: value * Math.random() };
  }

  async processDataWithDelay(delay = 1000) {
    for await (const item of this.#asyncDataGenerator(delay)) {
      print('Processed:', item);
    }
  }

  async *#asyncDataGenerator(delay) {
    for (let item of this.#privateData) {
      await new Promise(resolve => setTimeout(resolve, delay));
      yield this.#complexOperation(item);
    }
  }

  static #defaultData = [
    { key: 'a', value: 1 },
    { key: 'b', value: 2 },
    { key: 'c', value: 3 }
  ];

  static createWithDefaultData() {
    return new DataProcessor(this.#defaultData);
  }
}

 
(async () => {
  const processor = DataProcessor.createWithDefaultData();

  print('Synchronous processing:');
  for (let data of processor.processData()) {
    print(data);
  }

  print('Asynchronous processing with delay:');
  await processor.processDataWithDelay(500);
})();
