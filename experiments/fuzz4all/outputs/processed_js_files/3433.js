class Deferred {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function* asyncGenerator(start, end) {
  for (let i = start; i <= end; i++) {
    await sleep(100);
    yield i;
  }
}

async function runComplexAsyncFlow() {
  try {
    const deferred = new Deferred();

    const dataProcessor = async (dataPromise) => {
      const data = await dataPromise;
      print('Processed Data:', data);
      return data * 2;
    };

    (async () => {
      for await (const num of asyncGenerator(1, 5)) {
        print('Generated:', num);
        if (num === 3) deferred.resolve('Finished processing number 3');
      }
    })();

    const result = await dataProcessor(deferred.promise);
    print('Final Result:', result);
  } catch (error) {
    console.error('Error in async flow:', error);
  }
}

runComplexAsyncFlow();
