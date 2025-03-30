 
class DataProcessor {
  constructor(data) {
    this.data = data;
  }

  async processData() {
    try {
      const results = await Promise.all(this.data.map(async item => {
        let transformed = await this.complexTransformation(item);
        return this.filterData(transformed);
      }));
      
      const flatResults = results.flat();
      return this.calculateSummary(flatResults);
    } catch (error) {
      console.error('Processing error:', error);
    }
  }

  async complexTransformation(item) {
     
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(item.map(i => i * 2).filter(i => i % 3 === 0));
      }, 100);
    });
  }

  filterData(data) {
    return data.filter(value => value > 10);
  }

  calculateSummary(data) {
    const sum = data.reduce((acc, curr) => acc + curr, 0);
    return { sum, avg: sum / data.length };
  }
}

 
(async () => {
  const dataProcessor = new DataProcessor([[1, 2, 3, 6], [5, 10, 15], [7, 14, 21]]);
  const summary = await dataProcessor.processData();
  print('Summary:', summary);
})();
