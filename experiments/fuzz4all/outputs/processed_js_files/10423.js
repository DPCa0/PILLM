class AsyncTaskQueue {
  constructor(concurrency) {
    this.queue = [];
    this.running = 0;
    this.concurrency = concurrency;
  }

  async run(task) {
    this.queue.push(task);
    process.nextTick(this.dequeue.bind(this));
    return new Promise((resolve, reject) => {
      task.resolve = resolve;
      task.reject = reject;
    });
  }

  async dequeue() {
    if (this.running < this.concurrency && this.queue.length) {
      const task = this.queue.shift();
      this.running++;
      try {
        const result = await task.fn();
        task.resolve(result);
      } catch (error) {
        task.reject(error);
      } finally {
        this.running--;
        this.dequeue();
      }
    }
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  const queue = new AsyncTaskQueue(2);

  const tasks = Array.from({ length: 5 }, (_, i) => () => {
    print(`Task ${i + 1} started`);
    return delay(1000).then(() => `Task ${i + 1} completed`);
  });

  const results = await Promise.all(tasks.map(task => queue.run({ fn: task })));

  print(results);
})();
