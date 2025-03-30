class AsyncProcessor {
  constructor(data) {
    this.data = data;
  }

  async *dataGenerator() {
    for (const item of this.data) {
      yield new Promise((resolve) =>
        setTimeout(() => resolve(`Processed: ${item}`), 1000)
      );
    }
  }

  async processAll() {
    const results = [];
    for await (const processedItem of this.dataGenerator()) {
      results.push(processedItem);
    }
    return results;
  }

  static async processDataWithLogging(data) {
    try {
      const processor = new AsyncProcessor(data);
      const results = await processor.processAll();
      results.forEach((result) => print(result));
    } catch (error) {
      console.error('Processing error:', error);
    }
  }
}

 
const targetObject = {
  name: 'ProxyTarget',
  action: () => console.log('Action performed!'),
};

const proxyHandler = {
  get(target, property) {
    print(`Accessing property "${property}"`);
    return Reflect.get(target, property);
  },
  apply(target, thisArg, argumentsList) {
    print(`Calling function with args: ${argumentsList}`);
    return Reflect.apply(target, thisArg, argumentsList);
  },
};

const proxiedObject = new Proxy(targetObject, proxyHandler);

 
proxiedObject.action();
AsyncProcessor.processDataWithLogging(['item1', 'item2', 'item3']);
