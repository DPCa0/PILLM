class AsyncProcessor {
  constructor(data) {
    this.data = data;
  }

   
  async processData() {
    const results = await Promise.all(this.data.map(async (item) => {
      try {
        const processed = await this.asyncOperation(item);
        return processed;
      } catch (error) {
        return { error: error.message };
      }
    }));
    return results;
  }

   
  asyncOperation(item) {
    return new Promise((resolve, reject) => {
      const delay = Math.random() * 2000;
      setTimeout(() => {
        if (Math.random() > 0.1) {
          resolve(`Processed: ${item}`);
        } else {
          reject(new Error(`Failed processing: ${item}`));
        }
      }, delay);
    });
  }
}

 
const handler = {
  get(target, property) {
    if (typeof target[property] === 'function') {
      return function (...args) {
        print(`Calling ${property} with arguments: ${JSON.stringify(args)}`);
        return target[property].apply(this, args);
      };
    }
    return target[property];
  }
};

 
const dataToProcess = ['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5'];

 
const processor = new Proxy(new AsyncProcessor(dataToProcess), handler);

 
(async () => {
  const results = await processor.processData();
  print('Processing Results:', results);
})();
