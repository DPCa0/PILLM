 

class AsyncProcessor {
  constructor(data) {
    this.data = data;
    this[Symbol.for('processed')] = false;
  }

  async process() {
    this.data = await new Promise((resolve) => {
      setTimeout(() => resolve(this.data.map(x => x * 2)), 1000);
    });
    this[Symbol.for('processed')] = true;
    return this.data;
  }
}

const handler = {
  get: (target, prop, receiver) => {
    if (prop === 'isProcessed') {
      return target[Symbol.for('processed')];
    }
    return Reflect.get(target, prop, receiver);
  }
};

async function main() {
  const data = [1, 2, 3, 4, 5];
  const processor = new Proxy(new AsyncProcessor(data), handler);
  
  print('Data processed:', processor.isProcessed);  
  print('Processing data...');
  await processor.process();
  print('Data processed:', processor.isProcessed);  
  print('Processed data:', processor.data);
}

main();
