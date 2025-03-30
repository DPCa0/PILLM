 
class DataProcessor {
  constructor(data) {
    this.data = data;
  }
  
   
  async fetchData() {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.data), 1000);
    });
  }

   
  *processData() {
    for (const item of this.data) {
      yield item * 2;
    }
  }

   
  static logResult(result) {
    print('Processed Result:', result);
  }
}

 
const handler = {
  get: function(target, propKey) {
    const origMethod = target[propKey];
    return function(...args) {
      print(`Calling ${propKey} with`, args);
      return origMethod.apply(this, args);
    };
  }
};

const data = [1, 2, 3, 4, 5];
const processorProxy = new Proxy(DataProcessor.prototype, handler);
Object.setPrototypeOf(DataProcessor.prototype, processorProxy);

const processor = new DataProcessor(data);

(async () => {
  try {
     
    const fetchedData = await processor.fetchData();
    const processed = [...processor.processData.call({ data: fetchedData })];
    
     
    DataProcessor.logResult(processed);
  } catch (error) {
    console.error('Error processing data:', error);
  }
})();
