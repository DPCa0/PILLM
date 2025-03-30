class AsyncProcessor {
  constructor(data) {
    this.data = data;
  }

  static #privateHelperMethod(item) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(item * item);
      }, Math.random() * 1000);
    });
  }

  async *processData() {
    for (const item of this.data) {
      yield await AsyncProcessor.#privateHelperMethod(item);
    }
  }

  async run() {
    const results = [];
    for await (const processed of this.processData()) {
      results.push(processed);
    }
    return results;
  }
}

(async () => {
  const processor = new AsyncProcessor([1, 2, 3, 4, 5]);
  const results = await processor.run();
  const doubledResults = results.flatMap(num => [num, num]);

  const max = Math.max(...results);
  const min = Math.min(...results);

  console.log({
    results,
    doubledResults,
    statistics: {
      max,
      min,
      average: results.reduce((sum, val) => sum + val, 0) / results.length
    }
  });
})();
