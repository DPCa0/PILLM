class AsyncIteratorExample {
  constructor(data) {
    this.data = data;
  }
  
  async *[Symbol.asyncIterator]() {
    for (let item of this.data) {
      await new Promise(resolve => setTimeout(resolve, 1000));  
      yield item;
    }
  }
}

const fetchData = async () => {
   
  await new Promise(resolve => setTimeout(resolve, 500));
  return ['Data 1', 'Data 2', 'Data 3'];
};

(async () => {
  const data = await fetchData();
  const asyncIterator = new AsyncIteratorExample(data);

  for await (const item of asyncIterator) {
    print(`Processed: ${item}`);
  }
  
  const handler = {
    get: (target, prop, receiver) => {
      print(`Accessed property: ${prop}`);
      return Reflect.get(...arguments);
    },
    set: (target, prop, value) => {
      print(`Setting property: ${prop} to ${value}`);
      return Reflect.set(...arguments);
    }
  };

  const proxyData = new Proxy(data, handler);

  print(proxyData[0]);  
  proxyData[1] = 'Modified Data 2';  
})();
