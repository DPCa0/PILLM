class AsyncQueue {
  constructor() {
    this.queue = [];
    this.isRunning = false;
  }
  
  async enqueue(task) {
    return new Promise((resolve) => {
      this.queue.push(async () => {
        await task();
        resolve();
      });
      if (!this.isRunning) {
        this.isRunning = true;
        this.run();
      }
    });
  }

  async run() {
    while (this.queue.length) {
      const task = this.queue.shift();
      await task();
    }
    this.isRunning = false;
  }
}

async function complexAsyncTask(id) {
  const delay = Math.floor(Math.random() * 3000);
  return new Promise((resolve) => {
    setTimeout(() => {
      print(`Task ${id} completed in ${delay}ms`);
      resolve();
    }, delay);
  });
}

const asyncQueue = new AsyncQueue();

(async () => {
  await Promise.all([
    asyncQueue.enqueue(() => complexAsyncTask(1)),
    asyncQueue.enqueue(() => complexAsyncTask(2)),
    asyncQueue.enqueue(() => complexAsyncTask(3)),
  ]);
  print('All tasks are complete');
})();
