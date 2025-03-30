 
class AsyncDataHandler {
  constructor(data) {
    this.data = data;
  }

  async *dataGenerator() {
    for (let item of this.data) {
      yield new Promise((resolve) => setTimeout(() => resolve(item * 2), 100));
    }
  }

  async processData() {
    const results = [];
    for await (let value of this.dataGenerator()) {
      results.push(value);
    }
    return results;
  }
}

const handler = {
  get: function(target, prop, receiver) {
    if (prop === 'fetchData') {
      return async function() {
        const data = await target.processData();
        return `Processed data: ${data.join(', ')}`;
      };
    }
    return Reflect.get(target, prop, receiver);
  }
};

const data = [1, 2, 3, 4, 5];
const dataHandler = new AsyncDataHandler(data);
const proxiedHandler = new Proxy(dataHandler, handler);

(async () => {
  const result = await proxiedHandler.fetchData();
  print(result);
})();
