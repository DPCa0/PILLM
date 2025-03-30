class TaskQueue {
  constructor(concurrency) {
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
  }

  async runTask(task) {
    this.running++;
    try {
      await task();
    } finally {
      this.running--;
      this.next();
    }
  }

  addTask(task) {
    if (this.running < this.concurrency) {
      this.runTask(task);
    } else {
      this.queue.push(task);
    }
  }

  next() {
    if (this.running < this.concurrency && this.queue.length) {
      this.runTask(this.queue.shift());
    }
  }
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const createTask = (id, duration) => async () => {
  print(`Task ${id} started`);
  await delay(duration);
  print(`Task ${id} finished`);
};

const main = async () => {
  const queue = new TaskQueue(2);

  for (let i = 1; i <= 5; i++) {
    queue.addTask(createTask(i, 1000 * i));
  }
};

main();
