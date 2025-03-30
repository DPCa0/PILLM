class CustomPromise extends Promise {
  static resolveWithDelay(value, delay = 1000) {
    return new CustomPromise((resolve) => setTimeout(() => resolve(value), delay));
  }
}

const asyncIterable = {
  [Symbol.asyncIterator]() {
    let i = 0;
    return {
      next: async () => {
        if (i < 5) {
          const value = await CustomPromise.resolveWithDelay(i++);
          return { value, done: false };
        } else {
          return { done: true };
        }
      },
    };
  },
};

const doSomeHeavyWork = async (value) => {
  const double = value * 2;
  const result = await CustomPromise.resolveWithDelay(double, 500);
  return `Processed value: ${result}`;
};

(async () => {
  try {
    for await (const num of asyncIterable) {
      const result = await doSomeHeavyWork(num);
      print(result);
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();

const proxyHandler = {
  get(target, property) {
    if (property in target) {
      return target[property];
    }
    return `Property "${property}" not found`;
  },
};

const config = { setting1: true, setting2: false };
const proxyConfig = new Proxy(config, proxyHandler);

print('Setting1:', proxyConfig.setting1);
print('Setting3:', proxyConfig.setting3);
