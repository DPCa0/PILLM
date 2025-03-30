 
 

function* dataGenerator() {
   
  yield* ['data1', 'data2', 'data3'];
}

const asyncDataProcessor = async (data) => {
   
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Processed ${data}`);
    }, Math.random() * 1000);
  });
};

const dataPipeline = async () => {
  const iterator = dataGenerator();
  
  while (true) {
    const { value, done } = iterator.next();
    if (done) break;
    
     
    const handler = {
      apply: async (target, thisArg, args) => {
        print(`Processing started for: ${args[0]}`);
        const result = await Reflect.apply(target, thisArg, args);
        print(`Processing finished for: ${args[0]}`);
        return result;
      }
    };
    
    const proxiedAsyncProcessor = new Proxy(asyncDataProcessor, handler);
    const result = await proxiedAsyncProcessor(value);
    print(result);
  }
};

 
dataPipeline().catch(err => console.error('Error in data pipeline:', err));
