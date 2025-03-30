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
      this.next();
    }
  }

  addTask(task) {
    this.queue.push(task);
    process.nextTick(this.next.bind(this));
  }

  next() {
    if (this.running < this.concurrency && this.queue.length) {
      const task = this.queue.shift();
      this.runTask(task);
    }
  }
}

 
const createTask = (name, duration) => async () => {
  print(`Task ${name} started`);
  await new Promise(resolve => setTimeout(resolve, duration));
  print(`Task ${name} completed`);
};

 
async function* taskGenerator() {
  const tasks = [
    createTask('A', 1000),
    createTask('B', 500),
    createTask('C', 300),
    createTask('D', 1200),
  ];

  for (const task of tasks) {
    yield task;
  }
}

(async () => {
  const taskQueue = new TaskQueue(2);

  for await (const task of taskGenerator()) {
    taskQueue.addTask(task);
  }
})();
