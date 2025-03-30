class AsyncPool {
  constructor(concurrency) {
    this.concurrency = concurrency;
    this.currentlyRunning = 0;
    this.taskQueue = [];
  }
  
  async runTask(task) {
    this.currentlyRunning++;
    try {
      await task();
    } finally {
      this.currentlyRunning--;
      this.next();
    }
  }
  
  addTask(task) {
    if (this.currentlyRunning < this.concurrency) {
      this.runTask(task);
    } else {
      this.taskQueue.push(task);
    }
  }
  
  next() {
    if (this.taskQueue.length > 0 && this.currentlyRunning < this.concurrency) {
      const nextTask = this.taskQueue.shift();
      this.runTask(nextTask);
    }
  }
}

const pool = new AsyncPool(3);

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const createTask = (id) => async () => {
  print(`Task ${id} started`);
  await delay(Math.random() * 2000);
  print(`Task ${id} completed`);
};

for (let i = 0; i < 10; i++) {
  pool.addTask(createTask(i));
}
