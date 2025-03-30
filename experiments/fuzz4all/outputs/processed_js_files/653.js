class AsyncIterable {
  constructor(limit) {
    this.limit = limit;
  }

  [Symbol.asyncIterator]() {
    let count = 0;
    return {
      next: () => {
        if (count < this.limit) {
          return new Promise(resolve => {
            setTimeout(() => {
              resolve({ value: count++, done: false });
            }, 100);
          });
        } else {
          return Promise.resolve({ done: true });
        }
      }
    };
  }
}

const run = async () => {
  try {
     
    const config = { delay: 200, retries: 3 };
    const { delay, ...restConfig } = config;
    print(`Config: delay=${delay}, rest=${JSON.stringify(restConfig)}`);

    const asyncIterable = new AsyncIterable(5);
    for await (const num of asyncIterable) {
      print(`Number: ${num}`);
    }

    const factorial = n => n <= 1 ? 1 : n * factorial(n - 1);

    const memoize = fn => {
      const cache = new Map();
      return arg => {
        if (cache.has(arg)) return cache.get(arg);
        const result = fn(arg);
        cache.set(arg, result);
        return result;
      };
    };

    const fastFactorial = memoize(factorial);
    print(`Factorial 5: ${fastFactorial(5)}`);

  } catch (error) {
    console.error('Error:', error);
  }
};

run();
