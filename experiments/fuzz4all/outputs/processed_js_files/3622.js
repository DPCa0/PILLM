 

class DataProcessor {
  constructor(data) {
    this.data = data;
  }
  
  *filterByCriteria(criteriaFn) {
    for (let item of this.data) {
      if (criteriaFn(item)) yield item;
    }
  }

  static async processAsync(data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data.map(item => ({ ...item, processed: true })));
      }, 1000);
    });
  }
}

const fetchData = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { id: 1, value: 10 },
        { id: 2, value: 20 },
        { id: 3, value: 15 }
      ]);
    }, 500);
  });
};

(async () => {
  const rawData = await fetchData();
  print('Raw Data:', rawData);

  const processedData = await DataProcessor.processAsync(rawData);
  print('Processed Data:', processedData);

  const dataProcessor = new DataProcessor(processedData);
  const filteredData = [...dataProcessor.filterByCriteria(item => item.value > 12)];
  
  print('Filtered Data:', filteredData);
})();
