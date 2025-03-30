class AsyncProcessor {
  constructor(data) {
    this.data = data;
  }

  async processData() {
    const processedData = await Promise.all(this.data.map(async (item) => {
      await this.simulateAsyncOperation(item);
      return item ** 2;
    }));
    return processedData.filter(num => num % 2 === 0);
  }

  simulateAsyncOperation(item) {
    return new Promise(resolve => setTimeout(() => {
      print(`Processed ${item}`);
      resolve();
    }, Math.random() * 1000));
  }
}

const proxyHandler = {
  get: (target, prop) => {
    if (prop === 'data') {
      print('Accessing data...');
      return target[prop].map(item => item * 10);
    }
    return target[prop];
  }
};

const data = [1, 2, 3, 4, 5];
const processor = new Proxy(new AsyncProcessor(data), proxyHandler);

(async () => {
  print('Original data:', data);
  const results = await processor.processData();
  print('Processed even squares:', results);
})();
