class AsyncOperation {
  constructor() {
    this.data = new Map();
  }

  async fetchData(key) {
     
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`${key}_data`);
      }, Math.random() * 1000);
    });
  }

  async memoize(key) {
    if (!this.data.has(key)) {
      const value = await this.fetchData(key);
      this.data.set(key, value);
    }
    return this.data.get(key);
  }
}

const advancedFeaturesDemo = async () => {
  const operations = ['task1', 'task2', 'task3', 'task4'];
  const asyncOp = new AsyncOperation();

   
  const results = await Promise.all(
    operations.map(op => asyncOp.memoize(op))
  );

  const [first, ...rest] = results;
  print('First result:', first);
  print('Other results:', ...rest);

   
  const processedResults = {
    first,
    restResults: rest.map(result => result.toUpperCase())
  };

  print('Processed Results:', processedResults);

   
  const handler = {
    get(target, prop) {
      if (prop in target) {
        return target[prop];
      }
      console.warn(`Property ${prop} does not exist`);
      return undefined;
    }
  };

  const proxy = new Proxy(processedResults, handler);
  print('Accessing existing property:', proxy.first);
  print('Accessing non-existing property:', proxy.nonExistent);
};

advancedFeaturesDemo();
