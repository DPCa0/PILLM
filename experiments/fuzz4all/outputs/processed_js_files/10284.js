class ComplexProcessor {
  static #privateCounter = 0;  

  constructor(data) {
    this.data = data;
  }

  static *generateIDs() {  
    while (true) {
      yield `id_${this.#privateCounter++}`;
    }
  }

  async processData(callback) {  
    try {
      const processedData = await Promise.all(this.data.map(async item => {
        const modifiedItem = await this.#simulateAsyncOperation(item);
        return callback(modifiedItem);
      }));
      return processedData;
    } catch (error) {
      console.error('Error processing data:', error);
      throw error;
    }
  }

  #simulateAsyncOperation(item) {  
    return new Promise(resolve => {
      setTimeout(() => resolve(item * 2), Math.random() * 1000);
    });
  }
}

 
const ids = ComplexProcessor.generateIDs();
const processor = new ComplexProcessor([1, 2, 3, 4, 5]);

(async () => {
  const results = await processor.processData(item => `${item}_${ids.next().value}`);
  print('Processed Results:', results);
})();
