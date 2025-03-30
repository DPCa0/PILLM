class DataProcessor {
  constructor(data) {
    this.data = data;
  }

  async processData() {
    return Promise.all(this.data.map(async (item) => {
      await this.simulateAsyncTask(item);
      return this.transform(item);
    }));
  }

  transform(item) {
    const { x, y } = item;
    return { x: x ** 2, y: Math.sqrt(y) };
  }

  simulateAsyncTask(item) {
    return new Promise((resolve) => {
      setTimeout(() => {
        print(`Processed item: x=${item.x}, y=${item.y}`);
        resolve();
      }, 100);
    });
  }

  static logProcessedData(processedData) {
    print('Processed Data:', processedData);
  }
}

const data = [
  { x: 4, y: 16 },
  { x: 9, y: 25 },
  { x: 16, y: 36 }
];

(async () => {
  const processor = new DataProcessor(data);
  const processedData = await processor.processData();
  DataProcessor.logProcessedData(processedData);
})().catch(err => console.error('Error processing data:', err));
