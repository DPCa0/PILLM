class Deferred {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

async function* asyncGenerator(arr) {
  for (const item of arr) {
    await new Promise(resolve => setTimeout(resolve, 100));  
    yield item;
  }
}

const pipeline = async (data) => {
  const deferred = new Deferred();

  const worker = async (deferred) => {
    try {
      const results = [];
      for await (const item of asyncGenerator(data)) {
        results.push(item.toUpperCase());
      }
      deferred.resolve(results);
    } catch (error) {
      deferred.reject(error);
    }
  };

  worker(deferred);
  return deferred.promise;
};

const data = ['apple', 'banana', 'cherry'];

(async () => {
  try {
    const result = await pipeline(data);
    print('Processed Data:', result);
  } catch (error) {
    console.error('Error:', error);
  }
})();
