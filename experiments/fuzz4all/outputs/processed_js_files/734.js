 
class DataProcessor {
  constructor(data) {
    this.data = data;
  }

  async process() {
    try {
      const filteredData = await this.filterData();
      const transformedData = this.transformData(filteredData);
      const aggregatedResult = this.aggregateData(transformedData);
      return aggregatedResult;
    } catch (error) {
      console.error("Error processing data:", error);
    }
  }

  async filterData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.data.filter((item) => item.value > 10));
      }, 1000);
    });
  }

  transformData(filteredData) {
    return filteredData.map(({ value, multiplier }) => {
      const newValue = value * multiplier;
      return { newValue, isEven: newValue % 2 === 0 };
    });
  }

  aggregateData(transformedData) {
    return transformedData.reduce(
      (acc, { newValue, isEven }) => {
        acc.sum += newValue;
        isEven ? acc.evenCount++ : acc.oddCount++;
        return acc;
      },
      { sum: 0, evenCount: 0, oddCount: 0 }
    );
  }
}

(async () => {
  const sampleData = [
    { value: 5, multiplier: 2 },
    { value: 15, multiplier: 3 },
    { value: 25, multiplier: 1 },
    { value: 8, multiplier: 4 },
  ];

  const processor = new DataProcessor(sampleData);
  const result = await processor.process();
  print(result);  
})();
