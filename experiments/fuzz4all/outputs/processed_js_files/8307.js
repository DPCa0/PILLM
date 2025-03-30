 

class DataProcessor {
  constructor(data) {
    this.data = data;
  }

  async processData() {
    try {
      const filteredData = this.data.filter(item => item.value > 10);
      const processedData = await Promise.all(filteredData.map(item => this.asyncTransform(item)));
      return this.aggregateData(processedData);
    } catch (error) {
      console.error('Error processing data:', error);
    }
  }

  async asyncTransform(item) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ...item, transformed: true });
      }, 1000);
    });
  }

  aggregateData(dataArray) {
    return dataArray.reduce((acc, item) => acc + item.value, 0);
  }
}

const fetchData = async () => {
  return [
    { id: 1, value: 5 },
    { id: 2, value: 15 },
    { id: 3, value: 25 },
  ];
};

(async () => {
  const data = await fetchData();
  const processor = new DataProcessor(data);
  const result = await processor.processData();
  print('Aggregated result:', result);
})();
