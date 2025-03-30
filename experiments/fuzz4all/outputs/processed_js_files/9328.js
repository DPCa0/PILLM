class DataProcessor {
  constructor(data) {
    this.data = data;
  }

  async *processData() {
    for (let item of this.data) {
      yield new Promise((resolve) => 
        setTimeout(() => resolve(item * 2), 100)
      );
    }
  }

  static async processAndLog(dataProcessor) {
    for await (let processedItem of dataProcessor.processData()) {
      print(`Processed item: ${processedItem}`);
    }
  }
}

const data = [1, 2, 3, 4, 5];
const processor = new DataProcessor(data);

(async () => {
  print('Starting data processing...');
  await DataProcessor.processAndLog(processor);
  print('Data processing complete!');
})();
