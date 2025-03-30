 

class DataProcessor {
  constructor(data) {
    this.data = data;
  }

  async processData() {
    try {
      const cleanedData = await this.cleanData();
      const transformedData = await this.transformData(cleanedData);
      const analyzedData = this.analyzeData(transformedData);
      print('Final Result:', analyzedData);
    } catch (error) {
      console.error('Error processing data:', error);
    }
  }

  cleanData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const cleaned = this.data.filter((item) => item !== null);
        resolve(cleaned);
      }, 1000);
    });
  }

  transformData(data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const transformed = data.map((item) => item * 2);
        resolve(transformed);
      }, 1000);
    });
  }

  analyzeData(data) {
    const sum = data.reduce((acc, value) => acc + value, 0);
    return { sum, average: sum / data.length };
  }
}

(async () => {
  const initialData = [1, null, 2, 4, null, 5];
  const processor = new DataProcessor(initialData);

   
  const { data } = processor;

  print('Initial Data:', data);

  await processor.processData();
})();
