 
class DataProcessor {
  #data;  
  constructor(data) {
    this.#data = data;
  }

  async processData() {
    const filteredData = this.#filterData(this.#data);
    const transformedData = this.#transformData(filteredData);
    return this.#fetchData(transformedData);
  }

  #filterData(data) {
    return data.filter(item => item.active);
  }

  #transformData(data) {
    return data.map(item => ({
      ...item,
      processedAt: new Date(),
    }));
  }

  #fetchData(data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const processedData = data.reduce((acc, item) => {
            acc.push({ ...item, id: acc.length + 1 });
            return acc;
          }, []);
          resolve(processedData);
        } catch (error) {
          reject(error);
        }
      }, 1000);
    });
  }
}

const mockData = [
  { name: 'Alice', active: true },
  { name: 'Bob', active: false },
  { name: 'Charlie', active: true },
];

(async () => {
  const processor = new DataProcessor(mockData);
  try {
    const result = await processor.processData();
    print(result);
  } catch (error) {
    console.error('Error processing data:', error);
  }
})();
