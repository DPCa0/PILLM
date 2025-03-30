 
(async () => {
  const { randomUUID } = await import('crypto');

   
  const fetchData = () => new Promise((resolve) => {
    setTimeout(() => resolve({ id: randomUUID(), data: [Math.random(), Math.random(), Math.random()] }), 1000);
  });

   
  function* dataGenerator() {
    for (let i = 0; i < 3; i++) {
      yield fetchData();
    }
  }

   
  const handler = {
    get: (target, prop) => {
      if (prop in target) {
        print(`Accessed property: ${prop}`);
        return target[prop];
      } else {
        throw new Error(`Property ${prop} does not exist`);
      }
    }
  };

  const dataGenProxy = new Proxy(dataGenerator(), handler);

   
  const cache = new WeakMap();

   
  const asyncIterator = {
    async *[Symbol.asyncIterator]() {
      for await (const data of dataGenProxy) {
        if (!cache.has(data)) {
          cache.set(data, data);
          yield data;
        }
      }
    }
  };

   
  for await (const data of asyncIterator) {
    print(`Fetched data: ${JSON.stringify(data)}`);
  }
})();
