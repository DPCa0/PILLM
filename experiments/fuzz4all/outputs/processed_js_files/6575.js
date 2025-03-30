class DataStream {
  constructor() {
    this.data = [];
  }

  async *asyncDataGenerator() {
    let i = 0;
    while (i < this.data.length) {
      yield new Promise(resolve => setTimeout(() => resolve(this.data[i++]), 100));
    }
  }

  pushData(item) {
    this.data.push(item);
  }

  async process() {
    const asyncIterable = this.asyncDataGenerator();
    for await (const item of asyncIterable) {
      print(`Processed: ${item}`);
    }
  }
}

const stream = new DataStream();

 
const handler = {
  get(target, property) {
    if (typeof target[property] === 'function') {
      return function (...args) {
        print(`Calling ${property} with arguments: ${args}`);
        return target[property].apply(target, args);
      };
    } 
    return target[property];
  }
};

const proxiedStream = new Proxy(stream, handler);

proxiedStream.pushData('Event 1');
proxiedStream.pushData('Event 2');
proxiedStream.pushData('Event 3');

 
(async function() {
  const addDataPromises = Array.from({ length: 3 }, (_, i) => {
    return new Promise(resolve => {
      setTimeout(() => {
        proxiedStream.pushData(`Dynamic Event ${i + 4}`);
        resolve();
      }, 50 * (i + 1));
    });
  });
  
  await Promise.all(addDataPromises);

  await proxiedStream.process();
})();
