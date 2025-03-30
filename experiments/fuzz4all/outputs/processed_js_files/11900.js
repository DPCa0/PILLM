class DataPipeline {
  #data;
  
  constructor(data) {
    this.#data = data;
  }
  
  async *fetchData() {
    for (const item of this.#data) {
      await new Promise(resolve => setTimeout(resolve, 500));  
      yield item;
    }
  }

  static #transformData(item) {
    return {
      id: item.id,
      value: item.value * 2,
      timestamp: new Date().toISOString()
    };
  }

  async process() {
    const transformedData = [];
    for await (const item of this.fetchData()) {
      const transformed = DataPipeline.#transformData(item);
      transformedData.push(transformed);
    }
    return transformedData;
  }

  async save(transformedData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        print("Data saved:", JSON.stringify(transformedData, null, 2));
        resolve();
      }, 1000);  
    });
  }
}

(async () => {
  const initialData = [
    { id: 1, value: 42 },
    { id: 2, value: 100 },
    { id: 3, value: 75 }
  ];

  const pipeline = new DataPipeline(initialData);
  const transformedData = await pipeline.process();
  await pipeline.save(transformedData);
})();
