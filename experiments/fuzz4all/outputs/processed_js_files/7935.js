 

class AsyncMath {
  constructor() {
    this.cache = new Map();
  }

  async expensiveOperation(num) {
    if (this.cache.has(num)) {
      print('Fetching from cache:', num);
      return this.cache.get(num);
    }

    const result = await new Promise((resolve) =>
      setTimeout(() => resolve(num * num), 1000)
    );

    this.cache.set(num, result);
    return result;
  }
}

const asyncMathProxy = new Proxy(new AsyncMath(), {
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    } else {
      throw new Error(`Property ${prop} not found`);
    }
  },
  set(target, prop, value) {
    if (prop === 'cache') {
      throw new Error('Cache is read-only');
    } else {
      target[prop] = value;
      return true;
    }
  }
});

(async function () {
  const numList = [1, 2, 3, 2, 1];

  for (const num of numList) {
    try {
      const result = await asyncMathProxy.expensiveOperation(num);
      print(`Result for ${num}: ${result}`);
    } catch (error) {
      console.error(error);
    }
  }
})();
