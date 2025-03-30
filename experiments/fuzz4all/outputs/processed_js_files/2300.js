class AsyncDataProcessor {
  #secretKey = Symbol('secret');  
  
  constructor(data) {
    this.data = data;
    this.listeners = new Map();  
  }

  async process() {
    const promises = this.data.map(async (item, index) => {
      if (item.shouldFail) {
        throw new Error(`Processing failed at index ${index}`);
      }
      return await this.#simulateAsyncOperation(item.value);
    });

    try {
      const results = await Promise.allSettled(promises);
      this.#notifyListeners('processed', results);
    } catch (error) {
      this.#notifyListeners('error', error.message);
    }
  }

  #simulateAsyncOperation(value) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(value * 2), 100);
    });
  }

  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
  }

  #notifyListeners(event, data) {
    if (this.listeners.has(event)) {
      for (const callback of this.listeners.get(event)) {
        callback(data);
      }
    }
  }
}

 
const data = [{ value: 1 }, { value: 2, shouldFail: true }, { value: 3 }];
const processor = new AsyncDataProcessor(data);

processor.on('processed', results => {
  print('Processing results:', results.map(result => result.status === 'fulfilled' ? result.value : 'Error'));
});

processor.on('error', errorMessage => {
  console.error('Error during processing:', errorMessage);
});

processor.process();
