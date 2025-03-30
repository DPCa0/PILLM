class AsyncProcessor {
  constructor(data) {
    this.data = data;
  }

  async processData() {
    const results = await Promise.allSettled(this.data.map(async (item, index) => {
      if (index % 2 === 0) {
        return await this.asyncOperation(item, index);
      } else {
        throw new Error(`Intentional error at index ${index}`);
      }
    }));

    return results;
  }

  async asyncOperation(item, index) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ index, value: item * 2 });
      }, Math.random() * 1000);
    });
  }
}

const proxyHandler = {
  get(target, prop, receiver) {
    if (prop in target) {
      return Reflect.get(target, prop, receiver);
    } else {
      print(`Property ${prop} does not exist`);
      return () => {};
    }
  }
};

(async () => {
  const data = [10, 20, 30, 40, 50];
  const processor = new AsyncProcessor(data);
  const proxyProcessor = new Proxy(processor, proxyHandler);

  try {
    const results = await proxyProcessor.processData();
    results.forEach((result, idx) => {
      if (result.status === 'fulfilled') {
        print(`Result ${idx}:`, result.value);
      } else {
        console.warn(`Error at ${idx}:`, result.reason);
      }
    });

    proxyProcessor.nonExistentMethod();  
  } catch (error) {
    console.error('Processing Error:', error);
  }
})();
