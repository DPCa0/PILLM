class Deferred {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });
  }

  resolve(value) {
    this._resolve(value);
  }

  reject(reason) {
    this._reject(reason);
  }
}

function createAsyncIterable(arr, delay) {
  return {
    async *[Symbol.asyncIterator]() {
      for (let item of arr) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        yield item;
      }
    },
  };
}

async function main() {
  const deferred = new Deferred();
  const asyncIterable = createAsyncIterable([1, 2, 3, 4, 5], 1000);

  (async () => {
    try {
      print("Waiting to resolve...");
      const result = await deferred.promise;
      print("Deferred resolved with:", result);
    } catch (error) {
      print("Deferred rejected with:", error);
    }
  })();

  for await (let item of asyncIterable) {
    print("Async item:", item);
    if (item === 3) {
      deferred.resolve("Finished at 3");
      break;
    }
  }
}

main();
