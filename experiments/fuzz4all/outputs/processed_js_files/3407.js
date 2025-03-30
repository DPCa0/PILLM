class AsyncDataProcessor {
  constructor(data) {
    this.data = data;
  }

  async *dataGenerator() {
    for (const item of this.data) {
      yield await this.processData(item);
    }
  }

  async processData(item) {
     
    return new Promise((resolve) => {
      setTimeout(() => resolve(item * 2), Math.random() * 1000);
    });
  }

  async run() {
    const results = [];
    for await (const processed of this.dataGenerator()) {
      results.push(processed);
      print(`Processed: ${processed}`);
    }
    return results;
  }
}

 
const data = new Proxy([1, 2, 3, 4, 5], {
  get(target, property) {
    print(`Accessing element: ${property}`);
    return target[property];
  },
  set(target, property, value) {
    print(`Setting element ${property} to ${value}`);
    target[property] = value;
    return true;
  }
});

 
const [first, ...rest] = data;
print(`First: ${first}, Rest: ${rest}`);

 
const processor = new AsyncDataProcessor(data);
processor.run().then((results) => print(`Final Results: ${results}`));
