class Deferred {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

const asyncIterable = {
  async *[Symbol.asyncIterator]() {
    const deferreds = [];
    const intervalId = setInterval(() => {
      if (deferreds.length) {
        const deferred = deferreds.shift();
        deferred.resolve(Date.now());
      }
    }, 1000);

    try {
      while (true) {
        const deferred = new Deferred();
        deferreds.push(deferred);
        yield await deferred.promise;
      }
    } finally {
      clearInterval(intervalId);
    }
  },
};

(async () => {
  const log = console.log;
  const limit = 5;

  for await (const timestamp of asyncIterable) {
    log(`Current Timestamp: ${timestamp}`);
    if (--limit <= 0) break;
  }

  log('Iteration complete.');
})();
