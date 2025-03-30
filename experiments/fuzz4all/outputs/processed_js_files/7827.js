 
function logExecution(target, propertyKey, descriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = async function (...args) {
    print(`Calling ${propertyKey} with`, args);
    const startTime = Date.now();
    const result = await originalMethod.apply(this, args);
    print(`${propertyKey} executed in ${Date.now() - startTime}ms`);
    return result;
  };
  return descriptor;
}

 
async function* dataStream() {
  const data = ['data1', 'data2', 'data3'];
  for (const item of data) {
    await new Promise((resolve) => setTimeout(resolve, 500));  
    yield item;
  }
}

 
class DataProcessor {
  #processedData = [];

   
  @logExecution
  async processData(dataIterable) {
    for await (const data of dataIterable) {
      print(`Processing: ${data}`);
      this.#processedData.push(data.toUpperCase());
    }
    return this.#processedData;
  }

  get processedData() {
    return this.#processedData;
  }
}

 
(async () => {
  const processor = new DataProcessor();
  const dataGenerator = dataStream();

  const result = await processor.processData(dataGenerator);
  print('Processed Data:', result);
})();
