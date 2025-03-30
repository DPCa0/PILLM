class AsyncQueue {
  constructor() {
    this.queue = [];
    this.running = false;
  }

  async enqueue(task) {
    this.queue.push(task);
    if (!this.running) {
      this.running = true;
      while (this.queue.length) {
        const currentTask = this.queue.shift();
        await currentTask();
      }
      this.running = false;
    }
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const tasks = [
  async () => {
    print('Task 1: Start');
    await delay(1000);
    print('Task 1: End');
  },
  async () => {
    print('Task 2: Start');
    await delay(500);
    print('Task 2: End');
  },
  async () => {
    print('Task 3: Start');
    await delay(800);
    print('Task 3: End');
  }
];

const queue = new AsyncQueue();

(async () => {
  for (let task of tasks) {
    await queue.enqueue(task);
  }
})();
