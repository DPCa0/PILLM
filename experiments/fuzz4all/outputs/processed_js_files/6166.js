class DataProcessor {
  constructor(data) {
    this.data = data;
  }

  async process() {
    const results = await Promise.all(this.data.map(async item => {
      const result = await this.complexOperation(item);
      return this.enhanceResult(result);
    }));
    return this.combineResults(results);
  }

  complexOperation(item) {
    return new Promise(resolve => {
      setTimeout(() => resolve(item * Math.random()), 100);
    });
  }

  enhanceResult(result) {
    const metadata = { timestamp: new Date().toISOString(), value: result };
    return { ...metadata, enhancedValue: result * 2 };
  }

  combineResults(results) {
    return results.reduce((acc, current) => {
      acc.sum += current.enhancedValue;
      acc.entries.push(current);
      return acc;
    }, { sum: 0, entries: [] });
  }
}

(async () => {
  const data = [1, 2, 3, 4, 5];
  const processor = new DataProcessor(data);
  const result = await processor.process();
  print(result);
})();
