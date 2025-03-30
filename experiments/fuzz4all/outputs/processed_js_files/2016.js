class AsyncManager {
  constructor(limit) {
    this.limit = limit;
    this.activeCount = 0;
    this.queue = [];
  }

  async enqueue(promiseFunction) {
    if (this.activeCount < this.limit) {
      this.run(promiseFunction);
    } else {
      this.queue.push(promiseFunction);
    }
  }

  async run(promiseFunction) {
    this.activeCount++;
    try {
      await promiseFunction();
    } finally {
      this.activeCount--;
      if (this.queue.length > 0) {
        const nextFunction = this.queue.shift();
        this.run(nextFunction);
      }
    }
  }
}

const simulateAsyncTask = (taskName, duration) => {
  return () => new Promise((resolve) => {
    print(`Starting task: ${taskName}`);
    setTimeout(() => {
      print(`Completed task: ${taskName}`);
      resolve();
    }, duration);
  });
};

const manager = new AsyncManager(2);

['A', 'B', 'C', 'D', 'E', 'F'].forEach((task, index) => {
  manager.enqueue(simulateAsyncTask(task, (index + 1) * 1000));
});
