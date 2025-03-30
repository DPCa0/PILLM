class AsyncProcessor {
  constructor(data) {
    this.data = data;
  }

  async #simulateAsyncOperation(item) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(item * 2);
      }, Math.random() * 1000);
    });
  }

  #computeFactorial(n) {
    return n <= 1 ? 1 : n * this.#computeFactorial(n - 1);
  }

  async *processData() {
    for (const item of this.data) {
      const doubledValue = await this.#simulateAsyncOperation(item);
      yield this.#computeFactorial(doubledValue);
    }
  }
}

(async () => {
  const data = [1, 2, 3, 4];
  const processor = new AsyncProcessor(data);

  for await (const result of processor.processData()) {
    print(`Processed value: ${result}`);
  }
})();

