 

 
const _data = Symbol('data');

 
class DataPipeline {
  constructor(data) {
    this[_data] = data;
  }

   
  async *processData() {
    for (let item of this[_data]) {
      await new Promise(resolve => setTimeout(resolve, 100));  
      yield `Processed: ${item}`;
    }
  }
}

 
const handler = {
  get(target, prop, receiver) {
    if (prop === 'data') {
      print('Access to data is intercepted');
      return target[_data];
    }
    return Reflect.get(target, prop, receiver);
  }
};

 
const pipeline = new Proxy(new DataPipeline(['apple', 'banana', 'cherry']), handler);

 
async function consumePipeline(pipeline) {
  for await (let processedItem of pipeline.processData()) {
    print(processedItem);
  }
}

 
consumePipeline(pipeline);
