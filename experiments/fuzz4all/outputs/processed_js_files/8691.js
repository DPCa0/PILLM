class AsyncDataProcessor {
  constructor(data) {
    this.data = data;
  }

  async fetchData() {
     
    return new Promise((resolve) => setTimeout(() => resolve(this.data), 1000));
  }

  processDataAsync() {
    return (async () => {
      try {
        const data = await this.fetchData();
        return data.map(({ value }) => value * 2);
      } catch (error) {
        console.error("Error processing data:", error);
      }
    })();
  }
}

const dataset = [
  { id: 1, value: 10 },
  { id: 2, value: 20 },
  { id: 3, value: 30 }
];

const processor = new AsyncDataProcessor(dataset);

 
const safeArrayHandler = {
  get: (target, prop) => (prop in target ? target[prop] : undefined),
};

(async () => {
  const processedData = await processor.processDataAsync();
  const safeProcessedData = new Proxy(processedData, safeArrayHandler);

  print("Processed Data:", safeProcessedData[0]);  
  print("Out of Bounds Access:", safeProcessedData[10]);  
})();
