class AsyncProcessor {
  constructor(data) {
    this.data = data;
  }

  async processData() {
    try {
      const processedData = await Promise.all(this.data.map(async (item) => this.processItem(item)));
      print('Processed Data:', processedData);
    } catch (error) {
      console.error('Error processing data:', error);
    }
  }

  processItem(item) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.2) {
          resolve(item * 2);
        } else {
          reject('Processing error');
        }
      }, Math.random() * 1000);
    });
  }
}

const proxyHandler = {
  get(target, property) {
    if (property in target) {
      print(`Accessing property: ${property}`);
      return target[property];
    }
    throw new Error(`Property ${property} does not exist`);
  },
  set(target, property, value) {
    print(`Setting property: ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

const data = [1, 2, 3, 4, 5];
const processor = new AsyncProcessor(data);

const proxiedProcessor = new Proxy(processor, proxyHandler);

proxiedProcessor.processData();
