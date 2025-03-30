 
class AsyncProcessor {
  constructor(data) {
    this.data = data;
  }
  
   
  async *processData() {
    for (const item of this.data) {
      yield await this.processItem(item);
    }
  }

   
  async processItem(item) {
    return new Promise(resolve => 
      setTimeout(() => resolve(item * item), 100)
    );
  }

   
  static mergeAndProcess(...dataArrays) {
    const combined = [].concat(...dataArrays);
    const [first, second, ...rest] = combined;
    return [first, second, ...rest.map(item => item * 2)];
  }
}

 
function createLoggingProxy(target) {
  return new Proxy(target, {
    get(obj, prop, receiver) {
      print(`Getting property '${prop}'`);
      return Reflect.get(obj, prop, receiver);
    },
    set(obj, prop, value) {
      print(`Setting property '${prop}' to ${value}`);
      return Reflect.set(obj, prop, value);
    }
  });
}

 
(async () => {
  const processor = new AsyncProcessor([1, 2, 3, 4]);
  const results = [];

   
  for await (const result of processor.processData()) {
    results.push(result);
  }

  print('Processed Results:', results);

  const mergedArray = AsyncProcessor.mergeAndProcess([1, 2], [3, 4], [5]);
  print('Merged and Processed:', mergedArray);

   
  const proxiedResults = createLoggingProxy(results);
  proxiedResults.push(25);
  print(proxiedResults[2]);  
})();
