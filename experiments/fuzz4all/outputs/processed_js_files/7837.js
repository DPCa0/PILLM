class DataProcessor {
  constructor(data) {
    this.data = data;
  }

  async fetchData() {
     
    const simulatedFetch = () =>
      new Promise((resolve) =>
        setTimeout(() => resolve(this.data), 1000)
      );
    this.data = await simulatedFetch();
  }

  *dataGenerator() {
    for (const item of this.data) {
      yield item;
    }
  }

  transformData() {
     
    this.data = this.data.map(({ name, value }) => ({
      name,
      value: Math.sqrt(value).toFixed(2),
    }));
  }

  #filterData() {
     
    this.data = this.data.filter(({ value }) => value > 2);
  }

  static async processData(data) {
    const instance = new DataProcessor(data);
    await instance.fetchData();
    instance.transformData();
    instance.#filterData();
    return [...instance.dataGenerator()];
  }
}

 
(async () => {
  const data = [
    { name: 'A', value: 9 },
    { name: 'B', value: 1 },
    { name: 'C', value: 16 },
  ];

  const result = await DataProcessor.processData(data);
  print(result);  
})();
