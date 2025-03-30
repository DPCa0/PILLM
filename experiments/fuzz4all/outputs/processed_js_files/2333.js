 
 

class DataProcessor {
  constructor(data) {
    this.data = data;
  }

  async processData() {
     
    const rawData = await this.fetchData();
    
     
    const filteredData = rawData.map(({ id, value }) => ({ id, value }));
    
     
    const processedData = filteredData
      .filter(item => item.value % 2 === 0)
      .map(item => ({
        ...item,
        squaredValue: Math.pow(item.value, 2)
      }));

     
    const totalSquaredValue = processedData.reduce((acc, item) => acc + item.squaredValue, 0);
    
    return { processedData, totalSquaredValue };
  }

  fetchData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.data);
      }, 1000);
    });
  }
}

(async () => {
  const data = [
    { id: 1, value: 2 },
    { id: 2, value: 3 },
    { id: 3, value: 4 },
    { id: 4, value: 5 },
    { id: 5, value: 6 },
  ];
  
  const processor = new DataProcessor(data);
  const { processedData, totalSquaredValue } = await processor.processData();

  print('Processed Data:', processedData);
  print('Total Squared Value:', totalSquaredValue);
})();
