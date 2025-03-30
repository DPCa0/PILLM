class TaskQueue {
  constructor(concurrency) {
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
  }

  enqueue(task) {
    return new Promise((resolve, reject) => {
      this.queue.push(() => task().then(resolve, reject));
      this.next();
    });
  }

  next() {
    if (this.running < this.concurrency && this.queue.length) {
      const task = this.queue.shift();
      this.running++;
      task().finally(() => {
        this.running--;
        this.next();
      });
    }
  }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const taskQueue = new TaskQueue(2);

const createTask = (name, duration) => () => {
  print(`Starting task ${name}`);
  return delay(duration).then(() => print(`Completed task ${name}`));
};

(async () => {
  const tasks = [
    createTask('A', 1000),
    createTask('B', 500),
    createTask('C', 300),
    createTask('D', 400),
  ];

  await Promise.all(tasks.map(task => taskQueue.enqueue(task)));
  print('All tasks completed');
})();
