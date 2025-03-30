class DataProcessor {
  static #privateData = new WeakMap();

  constructor(data) {
    DataProcessor.#privateData.set(this, new Map());
    this.initializeData(data);
  }

  initializeData(data) {
    const privateData = DataProcessor.#privateData.get(this);
    data.forEach((item, index) => {
      privateData.set(index, item);
    });
  }

  async *processData(transformFn) {
    const privateData = DataProcessor.#privateData.get(this);
    for (let [key, value] of privateData) {
      const transformed = await transformFn(value);
      yield { key, transformed };
    }
  }

  static async run() {
    const data = [1, 2, 3, 4, 5];
    const processor = new DataProcessor(data);

    const transformation = async (num) => {
       
      return new Promise((resolve) => setTimeout(() => resolve(num * 2), 100));
    };

    for await (let { key, transformed } of processor.processData(transformation)) {
      print(`Key: ${key}, Transformed: ${transformed}`);
    }
  }
}

 
DataProcessor.run();
