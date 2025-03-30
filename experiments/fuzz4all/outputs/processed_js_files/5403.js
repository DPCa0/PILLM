class TaskQueue {
  constructor(concurrency) {
    this.concurrency = concurrency;
    this.queue = [];
    this.running = 0;
  }

  async runTask(task) {
    this.running++;
    try {
      await task();
    } finally {
      this.running--;
      this.runNext();
    }
  }

  enqueueTask(task) {
    if (this.running < this.concurrency) {
      this.runTask(task);
    } else {
      this.queue.push(task);
    }
  }

  runNext() {
    if (this.queue.length && this.running < this.concurrency) {
      const nextTask = this.queue.shift();
      this.runTask(nextTask);
    }
  }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const createTask = (id, time) => async () => {
  print(`Task ${id} started`);
  await delay(time);
  print(`Task ${id} finished`);
};

(async () => {
  const taskQueue = new TaskQueue(2);

  for (let i = 1; i <= 5; i++) {
    taskQueue.enqueueTask(createTask(i, 1000 * i));
  }
})();
