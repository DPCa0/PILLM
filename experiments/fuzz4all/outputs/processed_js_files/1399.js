class AsyncPool {
  constructor(maxConcurrency) {
    this.maxConcurrency = maxConcurrency;
    this.currentlyRunning = 0;
    this.taskQueue = [];
  }

  async run(task) {
    return new Promise((resolve, reject) => {
      this.taskQueue.push({ task, resolve, reject });
      this.runNext();
    });
  }

  async runNext() {
    if (this.currentlyRunning < this.maxConcurrency && this.taskQueue.length > 0) {
      const { task, resolve, reject } = this.taskQueue.shift();
      this.currentlyRunning++;
      try {
        const result = await task();
        resolve(result);
      } catch (error) {
        reject(error);
      } finally {
        this.currentlyRunning--;
        this.runNext();
      }
    }
  }
}

const delayTask = (ms, value) => () =>
  new Promise(resolve => setTimeout(() => resolve(value), ms));

(async () => {
  const pool = new AsyncPool(2);
  const tasks = [
    delayTask(1000, 'Task 1 Complete'),
    delayTask(500, 'Task 2 Complete'),
    delayTask(200, 'Task 3 Complete'),
    delayTask(800, 'Task 4 Complete')
  ];

  const results = await Promise.all(tasks.map(task => pool.run(task)));
  print(results);
})();
