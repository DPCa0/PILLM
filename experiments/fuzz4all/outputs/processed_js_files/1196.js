class AsyncQueue {
  constructor() {
    this.queue = [];
    this.processing = false;
  }

  async enqueue(task) {
    this.queue.push(task);
    if (!this.processing) this.processQueue();
  }

  async processQueue() {
    this.processing = true;
    while (this.queue.length) {
      const task = this.queue.shift();
      await task();
    }
    this.processing = false;
  }
}

function createTask(taskName, duration) {
  return async () => {
    print(`Starting task: ${taskName}`);
    await new Promise(resolve => setTimeout(resolve, duration));
    print(`Completed task: ${taskName}`);
  };
}

const taskQueue = new AsyncQueue();
const tasks = [
  createTask('Task 1', 1000),
  createTask('Task 2', 500),
  createTask('Task 3', 2000),
  createTask('Task 4', 1500),
];

 
Promise.allSettled(tasks.map(task => taskQueue.enqueue(task))).then(() =>
  console.log('All tasks are completed!')
);
