class AsyncProcessor {
  constructor(data) {
    this.data = data;
  }

  async *processData() {
    for (const item of this.data) {
      yield await this.complexCalculation(item);
    }
  }

  complexCalculation(item) {
    return new Promise(resolve => {
      setTimeout(() => resolve(item ** 2 + Math.random()), 100);
    });
  }

  static async run(data) {
    const processor = new AsyncProcessor(data);
    for await (const result of processor.processData()) {
      print(result);
    }
  }
}

const numbers = Array.from({ length: 5 }, (_, i) => i + 1);
AsyncProcessor.run(numbers);
