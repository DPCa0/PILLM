class DataProcessor {
  #privateData = new WeakMap();

  constructor(data) {
    this.id = Symbol('id');
    this.processedData = [];
    this.#privateData.set(this.id, data);
  }

  async processData() {
    const rawData = this.#privateData.get(this.id);
    const promises = rawData.map(async (item) => await this.#asyncTransform(item));
    this.processedData = await Promise.all(promises);
  }

  async #asyncTransform(item) {
     
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Processed: ${item}`);
      }, Math.random() * 1000);
    });
  }

  *processedDataGenerator() {
    for (const item of this.processedData) {
      yield item;
    }
  }
}

 
const data = ['a', 'b', 'c', 'd'];
const processor = new DataProcessor(data);

(async () => {
  await processor.processData();
  print('All data processed.');

  for (const processedItem of processor.processedDataGenerator()) {
    print(processedItem);
  }
})();
