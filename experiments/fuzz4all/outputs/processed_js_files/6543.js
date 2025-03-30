class AsyncQueue {
  constructor() {
    this.queue = [];
    this.processing = false;
  }

  async enqueue(task) {
    this.queue.push(task);
    if (!this.processing) {
      await this.process();
    }
  }

  async process() {
    this.processing = true;
    while (this.queue.length > 0) {
      const task = this.queue.shift();
      try {
        await task();
      } catch (error) {
        console.error("Task failed:", error);
      }
    }
    this.processing = false;
  }
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const exampleTasks = [
  async () => {
    print("Task 1 started");
    await delay(1000);
    print("Task 1 completed");
  },
  async () => {
    print("Task 2 started");
    await delay(500);
    print("Task 2 completed");
  },
  async () => {
    print("Task 3 started");
    await delay(1500);
    print("Task 3 completed");
  }
];

const main = async () => {
  const queue = new AsyncQueue();

  exampleTasks.forEach(async (task) => {
    await queue.enqueue(task);
  });
};

main();
