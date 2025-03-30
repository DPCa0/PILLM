class TaskQueue {
  constructor(concurrency) {
    this.concurrency = concurrency;
    this.queue = [];
    this.running = 0;
  }

  async runTask(task) {
    this.running++;
    await task();
    this.running--;
    this.next();
  }

  push(task) {
    this.queue.push(task);
    this.next();
  }

  next() {
    if (this.running < this.concurrency && this.queue.length) {
      const task = this.queue.shift();
      this.runTask(task);
    }
  }
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const queue = new TaskQueue(2);

const tasks = Array.from({ length: 5 }, (_, i) => async () => {
  print(`Starting task ${i + 1}`);
  await delay(1000);
  print(`Finished task ${i + 1}`);
});

tasks.forEach(task => queue.push(task));
