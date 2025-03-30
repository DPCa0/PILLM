class DataPipeline {
  constructor(data) {
    this.data = data;
  }

   
  *processData() {
    for (const item of this.data) {
      yield this.transformData(item);
    }
  }

  transformData(item) {
    return { ...item, processed: true, timestamp: new Date().toISOString() };
  }

  async filterData(callback) {
     
    let result = [];
    for await (const item of this.asynchronousData()) {
      if (callback(item)) {
        result.push(item);
      }
    }
    return result;
  }

  asynchronousData() {
     
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.data.map(item => ({ ...item, asyncProcessed: true })));
      }, 1000);
    });
  }
}

 
const data = [
  { id: 1, value: 'A' },
  { id: 2, value: 'B' },
  { id: 3, value: 'C' }
];

 
const proxyHandler = {
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    }
    print(`Property '${prop}' does not exist`);
  }
};

const pipeline = new DataPipeline(data);

 
(async () => {
  const proxiedPipeline = new Proxy(pipeline, proxyHandler);
  const generator = proxiedPipeline.processData();

  for (const processedItem of generator) {
    print('Processed Item:', processedItem);
  }

  const filteredData = await proxiedPipeline.filterData(item => item.id > 1);
  print('Filtered Data:', filteredData);
})();
