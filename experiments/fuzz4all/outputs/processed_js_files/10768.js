class DataProcessor {
  #privateData = new WeakMap();

  constructor(data) {
    this.rawData = data;
    this.#privateData.set(this, data.map(item => item * 2));
  }

  async *[Symbol.asyncIterator]() {
    for (const item of this.#privateData.get(this)) {
      await new Promise(resolve => setTimeout(resolve, 100));  
      yield item;
    }
  }

  static transformData(data, transformFn = x => x) {
    return data.flatMap(item => [item, transformFn(item)]);
  }
}

const main = async () => {
  const data = [1, 2, 3, 4];
  const transformedData = DataProcessor.transformData(data, x => x ** 2);
  print('Transformed Data:', transformedData);

  const processor = new DataProcessor(data);
  for await (const value of processor) {
    print('Processed Value:', value);
  }
};

main().catch(console.error);
