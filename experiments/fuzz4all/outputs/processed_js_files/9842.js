class DataProcessor {
  #data;

  constructor(data) {
    this.#data = Array.isArray(data) ? data : [];
  }

  async *processData() {
    for (const item of this.#data) {
      if (typeof item === 'number') {
        yield await this.#complexOperation(item);
      }
    }
  }

  #complexOperation(num) {
    return new Promise(resolve => {
      setTimeout(() => resolve(num * num + Math.random()), 100);
    });
  }

  static async execute(data) {
    const processor = new DataProcessor(data);
    const results = [];
    for await (const result of processor.processData()) {
      results.push(result);
    }
    return results;
  }
}

(async () => {
  const rawData = [1, 2, 'invalid', 4, 5];
  try {
    const results = await DataProcessor.execute(rawData);
    print(results);
  } catch (error) {
    console.error('Error processing data:', error);
  }
})();
