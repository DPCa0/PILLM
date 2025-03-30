class DataProcessor {
  constructor(data) {
    this.data = data;
  }

  *dataGenerator() {
    for (const item of this.data) {
      yield this.enhanceData(item);
    }
  }

  enhanceData(item) {
    return {
      ...item,
      enhancedValue: item.value * 2,
      timestamp: new Date().toISOString(),
    };
  }

  async processData() {
    const enhancedData = [];
    const generator = this.dataGenerator();
    for (const item of generator) {
      enhancedData.push(await Promise.resolve(item));
    }
    return enhancedData;
  }

  static async run(data) {
    const processor = new DataProcessor(data);
    const results = await processor.processData();
    console.table(results);
  }
}

 
const data = [
  { id: 1, value: 10 },
  { id: 2, value: 20 },
  { id: 3, value: 30 },
];

 
DataProcessor.run(data);
