class AsyncProcessor {
  constructor(data) {
    this.data = data;
  }

  async processData() {
    try {
      const results = await Promise.all(
        this.data.map(async (item) => {
          const squared = await this.square(item);
          const transformed = this.transform(squared);
          return transformed;
        })
      );
      return results;
    } catch (error) {
      console.error('Error processing data:', error);
    }
  }

  square(num) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(num * num), 100);
    });
  }

  transform(num) {
    return Math.log(num);
  }
}

const advancedDataHandler = (function* () {
  const data = [1, 2, 3, 4, 5];
  const processor = new AsyncProcessor(data);
  
  while (true) {
    const results = yield processor.processData();
    print('Processed results:', results);
  }
})();

(async () => {
  advancedDataHandler.next();
  const processed = await advancedDataHandler.next().value;
  advancedDataHandler.next(processed);
})();
