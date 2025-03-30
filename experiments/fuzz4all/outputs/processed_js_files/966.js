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
    this.queue.push(task);
    setImmediate(() => this.runNext());
  }

  runNext() {
    while (this.running < this.concurrency && this.queue.length) {
      const task = this.queue.shift();
      this.runTask(task);
    }
  }
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const fetchData = async id => {
  print(`Fetching data for task ${id}`);
  await sleep(1000);
  print(`Completed fetching data for task ${id}`);
};

const tasks = Array.from({ length: 10 }, (_, i) => () => fetchData(i + 1));

const taskQueue = new TaskQueue(3);
tasks.forEach(task => taskQueue.enqueueTask(task));
