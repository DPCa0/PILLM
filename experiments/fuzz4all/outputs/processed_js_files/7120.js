 

 
const asyncOperation = (time) => new Promise(resolve => setTimeout(resolve, time));

 
class DataProcessor {
  constructor(data) {
    this.data = data;
  }

   
  *processData() {
    for (let item of this.data) {
      yield this.transform(item);
    }
  }

   
  #transform(item) {
    return item.toUpperCase();
  }

   
  getData() {
    const handler = {
      get: (target, prop) => {
        print(`Accessed property: ${prop}`);
        return target[prop];
      }
    };
    return new Proxy(this.data, handler);
  }
}

 
async function run() {
  const data = ['apple', 'banana', 'cherry'];
  const processor = new DataProcessor(data);
  const proxyData = processor.getData();

  print(`Original data: ${proxyData}`);
  
  for await (let transformedItem of processor.processData()) {
    print(`Processed item: ${transformedItem}`);
    await asyncOperation(500);  
  }

   
  const uniqueData = new Set(data);
  const mappedData = new Map([...uniqueData].map(item => [item, item.length]));
  
  print('Mapped data with lengths:', [...mappedData.entries()]);
}

 
(async () => {
  await run();
})();
