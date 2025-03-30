class DataPipeline {
  constructor(data) {
    this.data = data;
  }

   
  async *fetchData() {
    for (let item of this.data) {
      await new Promise(resolve => setTimeout(resolve, 100));  
      yield item;
    }
  }

   
  accessLogger(obj) {
    return new Proxy(obj, {
      get(target, property, receiver) {
        print(`Accessing property "${property}"`);
        return Reflect.get(...arguments);
      },
    });
  }

   
  createProcessor() {
    const processItem = item => item * 2;
    return function(data) {
      return data.map(processItem);
    };
  }

   
  filterAndProcess(...criteria) {
    const processor = this.createProcessor();
    return processor(this.data.filter(item => criteria.every(criterion => criterion(item))));
  }
}

(async function main() {
   
  const dataset = new DataPipeline([1, 2, 3, 4, 5, 6]);

   
  for await (const item of dataset.fetchData()) {
    print(`Fetched data: ${item}`);
  }

   
  const dataWithLogger = dataset.accessLogger(dataset.data);
  print(dataWithLogger[0]);

   
  const processedData = dataset.filterAndProcess(
    num => num > 2,
    num => num % 2 === 0
  );
  print(`Filtered and Processed Data: ${processedData}`);
})();
