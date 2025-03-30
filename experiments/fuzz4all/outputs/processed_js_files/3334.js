class ComplexTask {
  constructor() {
    this.data = [1, 2, 3, 4, 5];
  }

  async *processData() {
    for (const num of this.data) {
      yield await this.asyncOperation(num);
    }
  }

  async asyncOperation(num) {
    return new Promise((resolve) => setTimeout(() => resolve(num * num), 100));
  }

  async execute() {
    const results = [];
    for await (const result of this.processData()) {
      results.push(result);
    }
    return results;
  }

  static memoize(fn) {
    const cache = new Map();
    return (...args) => {
      const key = JSON.stringify(args);
      if (cache.has(key)) {
        return cache.get(key);
      }
      const result = fn(...args);
      cache.set(key, result);
      return result;
    };
  }
}

const task = new ComplexTask();
const memoizedExecute = ComplexTask.memoize(task.execute.bind(task));

(async () => {
  print("First Call:", await memoizedExecute());
  print("Second Call (from cache):", await memoizedExecute());
})();
