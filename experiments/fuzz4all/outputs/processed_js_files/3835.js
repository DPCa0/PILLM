(async () => {
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
      for (let i = 0; i < 5; i++) {
        await new Promise(resolve => setTimeout(resolve, 100));  
        yield i;
      }
    }
  };

  const processNumber = (number) => new Promise((resolve) => {
    setTimeout(() => {
      print(`Processed: ${number}`);
      resolve(number * 2);
    }, 150);
  });

  const processData = async (data, concurrency = 2) => {
    const results = [];
    const executing = [];
    for await (const item of data) {
      const p = processNumber(item);
      results.push(p);

      if (concurrency <= data.length) {
        const e = p.then(() => executing.splice(executing.indexOf(e), 1));
        executing.push(e);
        if (executing.length >= concurrency) {
          await Promise.race(executing);
        }
      }
    }
    return Promise.all(results);
  };

  const main = async () => {
    try {
      print('Starting processing...');
      const results = await processData(asyncIterable, 3);
      print('All processed:', results);
    } catch (err) {
      console.error('Error during processing:', err);
    }
  };

  main();
})();
