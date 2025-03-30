class DataProcessor {
  #data;
  
  constructor(initialData) {
    this.#data = initialData;
  }

  *dataGenerator() {
    for (let item of this.#data) {
      yield this.processItem(item);
    }
  }

  async processData() {
    const processed = [];
    const processPromises = [...this.dataGenerator()].map(async promise => {
      try {
        const value = await promise;
        processed.push(value);
      } catch (error) {
        console.error('Processing error:', error);
      }
    });
    await Promise.all(processPromises);
    return this.transformData(processed);
  }

  async processItem(item) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.2) {
          resolve(item * 2);
        } else {
          reject('Random processing failure');
        }
      }, 100);
    });
  }

  transformData(data) {
    return new Proxy(data, {
      get(target, prop, receiver) {
        if (prop === 'average') {
          return target.reduce((a, b) => a + b, 0) / target.length;
        }
        return Reflect.get(...arguments);
      }
    });
  }
}

(async () => {
  const initialData = [1, 2, 3, 4, 5];
  const processor = new DataProcessor(initialData);
  const result = await processor.processData();
  print('Processed data:', result);
  print('Average:', result.average);
})();
