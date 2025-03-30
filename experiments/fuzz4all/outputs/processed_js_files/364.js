 

class ComplexOperation {
  constructor(data) {
    this.data = data;
  }

  async processData() {
    const processedData = await this.fetchData();
    return this.transformData(processedData);
  }

  async fetchData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const { data } = this;
        resolve(data.map(item => ({ ...item, processed: true })));
      }, 1000);
    });
  }

  transformData(data) {
    return data.reduce((acc, item) => {
      const { id, value, processed } = item;
      if (processed) {
        acc[id] = value ** 2;
      }
      return acc;
    }, {});
  }
}

 
const sampleData = [
  { id: 1, value: 2 },
  { id: 2, value: 3 },
  { id: 3, value: 4 }
];

(async () => {
  const operation = new ComplexOperation(sampleData);
  const result = await operation.processData();
  print(result);  
})();
