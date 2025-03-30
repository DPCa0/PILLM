class AsyncProcessor {
  constructor(data) {
    this.data = data;
  }

  async *processData() {
    for (const item of this.data) {
      await new Promise(res => setTimeout(res, 100));  
      yield this._transformData(item);
    }
  }

  _transformData(item) {
    return item.split('').reverse().join('');
  }

  static logResults(results) {
    print('Transformed Results:', results.join(', '));
  }
}

(async () => {
  const data = ['hello', 'world', 'JavaScript', 'async', 'iterator'];
  const processor = new AsyncProcessor(data);
  const results = [];

  for await (const result of processor.processData()) {
    results.push(result);
  }

  AsyncProcessor.logResults(results);
})();
