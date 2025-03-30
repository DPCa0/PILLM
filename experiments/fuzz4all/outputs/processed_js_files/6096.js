class Deferred {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

async function complexOperation() {
  const asyncIterable = {
    async *[Symbol.asyncIterator]() {
      for (let i = 0; i < 5; i++) {
        await new Promise(resolve => setTimeout(resolve, 500));  
        yield i;
      }
    }
  };

  const results = [];
  for await (const num of asyncIterable) {
    const deferred = new Deferred();
    setTimeout(() => {
      deferred.resolve(num * 2);  
    }, 100);
    results.push(await deferred.promise);
  }

  const eventEmitter = new (require('events').EventEmitter)();
  process.nextTick(() => eventEmitter.emit('completed', results));

  return new Promise((resolve) => {
    eventEmitter.on('completed', data => {
      print('Async operation completed:', data);
      resolve(data);
    });
  });
}

(async () => {
  await complexOperation();
})();
