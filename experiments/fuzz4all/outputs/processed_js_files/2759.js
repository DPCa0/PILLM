 

class DataProcessor {
  constructor(data) {
    this.data = data;
  }

  async processData() {
    try {
      const rawData = await this.fetchData();
      const { filteredData, processedData } = this.transformData(rawData);
      print('Filtered Data:', filteredData);
      print('Processed Data:', processedData);
    } catch (error) {
      console.error('Error processing data:', error);
    }
  }

  fetchData() {
     
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const mockData = [...Array(20).keys()].map(num => ({ id: num, value: num * 2 }));
        resolve(mockData);
      }, 1000);
    });
  }

  transformData(data) {
     
    const filteredData = data.filter(({ id }) => id % 2 === 0);
    const processedData = filteredData.map(({ id, value }) => ({ id, newValue: value + 10 }));

    return { filteredData, processedData };
  }
}

(async () => {
  const dataProcessor = new DataProcessor([]);
  await dataProcessor.processData();
})();
