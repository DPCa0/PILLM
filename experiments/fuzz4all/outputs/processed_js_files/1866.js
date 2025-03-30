class AsyncQueue {
  constructor() {
    this.queue = [];
    this.processing = false;
  }

  async add(task) {
    this.queue.push(task);
    if (!this.processing) {
      this.processing = true;
      while (this.queue.length) {
        const currentTask = this.queue.shift();
        try {
          print(await currentTask());
        } catch (error) {
          console.error('Task failed', error);
        }
      }
      this.processing = false;
    }
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function createTask(name, duration) {
  return async () => {
    await delay(duration);
    return `Task ${name} completed`;
  };
}

const queue = new AsyncQueue();

const tasks = [
  createTask('A', 2000),
  createTask('B', 1000),
  createTask('C', 500)
];

for (const task of tasks) {
  queue.add(task);
}
