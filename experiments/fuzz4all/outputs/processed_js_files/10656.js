class DeferredPromise {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

async function* asyncGenerator(n) {
  for (let i = 0; i < n; i++) {
    yield new Promise((resolve) =>
      setTimeout(() => resolve(`Item ${i}`), Math.random() * 1000)
    );
  }
}

const handleAsyncIterator = async (iterator) => {
  const results = [];
  for await (let item of iterator) {
    print('Processing:', item);
    results.push(item);
  }
  return results;
};

const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (!cache.has(key)) {
      cache.set(key, fn(...args));
    }
    return cache.get(key);
  };
};

const complexCalculation = memoize((x) => {
  print('Performing complex calculation for:', x);
  return x * x;
});

(async () => {
   
  const deferred = new DeferredPromise();
  setTimeout(() => deferred.resolve('Deferred Result'), 2000);

   
  const iterator = asyncGenerator(5);

   
  const iteratorResults = await handleAsyncIterator(iterator);
  print('Iterator Results:', iteratorResults);

   
  print('First Calculation:', complexCalculation(4));
  print('Memoized Calculation:', complexCalculation(4));

   
  print('Deferred Promise Result:', await deferred.promise);
})();
