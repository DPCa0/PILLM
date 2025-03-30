class AsyncProcessor {
  static async *generateData() {
    const data = [1, 2, 3, 4, 5];
    for (let item of data) {
      yield new Promise(resolve => setTimeout(() => resolve(item), 1000));
    }
  }

  constructor(transformFunc) {
    this.transformFunc = transformFunc;
  }

  async process() {
    const results = [];
    for await (const item of AsyncProcessor.generateData()) {
      results.push(this.transformFunc(item));
    }
    return results;
  }
}

const pipeline = new AsyncProcessor((value) => {
  return { value, squared: value ** 2 };
});

(async () => {
  print('Processing started...');
  const results = await pipeline.process();
  print('Processing finished:', results);
})();
