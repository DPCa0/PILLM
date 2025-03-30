class AsyncProcessor {
  constructor(data) {
    this.data = data;
  }

  async *processData() {
    for (const item of this.data) {
      yield await this.simulateAsyncProcess(item);
    }
  }

  async simulateAsyncProcess(item) {
    return new Promise((resolve) =>
      setTimeout(() => resolve(`Processed: ${item}`), Math.random() * 1000)
    );
  }

  static async displayResults(asyncProcessor) {
    const results = [];
    for await (const result of asyncProcessor.processData()) {
      results.push(result);
    }
    print(results);
  }
}

const data = ['apple', 'banana', 'cherry'];
const processor = new AsyncProcessor(data);
AsyncProcessor.displayResults(processor);
