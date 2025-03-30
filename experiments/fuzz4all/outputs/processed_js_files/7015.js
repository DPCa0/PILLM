class AsyncTaskQueue {
  constructor(concurrency) {
    this.concurrency = concurrency;
    this.queue = [];
    this.activeCount = 0;
  }

  async runTask(task) {
    if (this.activeCount >= this.concurrency) {
      await new Promise(resolve => this.queue.push(resolve));
    }

    this.activeCount++;
    try {
      await task();
    } finally {
      this.activeCount--;
      if (this.queue.length > 0) {
        this.queue.shift()();
      }
    }
  }

  async addTasks(tasks) {
    await Promise.all(tasks.map(task => this.runTask(task)));
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const logTask = (id, ms) => async () => {
  print(`Task ${id} started`);
  await delay(ms);
  print(`Task ${id} completed`);
};

const queue = new AsyncTaskQueue(2);
const tasks = [
  logTask(1, 1000),
  logTask(2, 500),
  logTask(3, 800),
  logTask(4, 300)
];

queue.addTasks(tasks);
