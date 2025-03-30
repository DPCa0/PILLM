class AsyncProcessor {
  constructor(data) {
    this.data = data;
  }

  async *[Symbol.asyncIterator]() {
    for (let item of this.data) {
      yield this.processItem(item);
    }
  }

  processItem(item) {
    return new Promise(resolve => {
      setTimeout(() => resolve(item * 2), 100);
    });
  }

  static async processData(data) {
    const processor = new AsyncProcessor(data);
    for await (let processed of processor) {
      print(`Processed: ${processed}`);
    }
  }
}

const data = [1, 2, 3, 4, 5];
AsyncProcessor.processData(data).then(() => print('All data processed.'));
