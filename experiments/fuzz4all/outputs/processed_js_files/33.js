 

class DataProcessor {
  constructor(data) {
    this.data = data;
  }

  async fetchData() {
     
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.data, 'fetchedData1', 'fetchedData2']);
      }, 1000);
    });
  }

  async process() {
    try {
      const fetchedData = await this.fetchData();
      const processedData = this.calculateStats(fetchedData);
      return processedData;
    } catch (error) {
      console.error("Error processing data:", error);
    }
  }

  calculateStats(data) {
     
    const [first, second, ...rest] = data;
    const total = data.length;
    const restData = [...rest];
    const report = `First: ${first}, Second: ${second}, Total: ${total}, Others: ${restData.join(", ")}`;
    return report;
  }
}

(async () => {
  const initialData = ['initialData1', 'initialData2'];
  const processor = new DataProcessor(initialData);
  const report = await processor.process();
  print(report);
})();
