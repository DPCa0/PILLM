class AsyncQueue {
  constructor() {
    this.queue = [];
    this.isProcessing = false;
  }

  async enqueue(task) {
    this.queue.push(task);
    if (!this.isProcessing) {
      this.isProcessing = true;
      while (this.queue.length) {
        const currentTask = this.queue.shift();
        await currentTask();
      }
      this.isProcessing = false;
    }
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function advancedFunction() {
  print("Starting advanced function...");

  const tasks = new AsyncQueue();

  tasks.enqueue(async () => {
    await delay(1000);
    print("Task 1 Completed");
  });

  tasks.enqueue(async () => {
    await delay(500);
    print("Task 2 Completed");
  });

  tasks.enqueue(async () => {
    await delay(800);
    print("Task 3 Completed");
  });

  print("Advanced function setup completed.");
}

advancedFunction();
