class AsyncIterable {
  constructor(data) {
    this.data = data;
  }
  
  [Symbol.asyncIterator]() {
    let index = 0;
    const data = this.data;
    return {
      next: () =>
        new Promise(resolve => {
          setTimeout(() => {
            if (index < data.length) {
              resolve({ value: data[index++], done: false });
            } else {
              resolve({ done: true });
            }
          }, 1000);
        })
    };
  }
}

(async () => {
  const asyncIterable = new AsyncIterable([1, 2, 3, 4, 5]);
  
  for await (const num of asyncIterable) {
    print(num * num);
  }
})();

const memoize = fn => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      print(`Fetching from cache for args: ${key}`);
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    print(`Calculating result for args: ${key}`);
    return result;
  };
};

const fibonacci = memoize(n => {
  if (n < 2) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

print(fibonacci(10));  
print(fibonacci(10));  
