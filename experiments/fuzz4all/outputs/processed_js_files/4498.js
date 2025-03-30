class ComplexOperation {
  static #internalCache = new WeakMap();

  constructor(data) {
    if (ComplexOperation.#internalCache.has(data)) {
      return ComplexOperation.#internalCache.get(data);
    }

    this.data = data;
    ComplexOperation.#internalCache.set(data, this);
  }

  async *processData() {
    for await (const item of this.data) {
      yield await this.#complexCalculation(item);
    }
  }

  #complexCalculation(item) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(item ** 2);
      }, 100);
    });
  }

  static async execute(data) {
    const instance = new ComplexOperation(data);
    const results = [];
    for await (const result of instance.processData()) {
      results.push(result);
    }
    return results;
  }
}

const dataGenerator = (function* () {
  for (let i = 1; i <= 5; i++) {
    yield i;
  }
})();

(async () => {
  try {
    const results = await ComplexOperation.execute(dataGenerator);
    print("Processed Results:", results);
  } catch (error) {
    console.error("An error occurred:", error);
  }
})();
