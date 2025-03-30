class AsyncQueue {
  constructor() {
    this.queue = [];
    this.isProcessing = false;
  }
  
  enqueue(promiseFunc) {
    this.queue.push(promiseFunc);
    if (!this.isProcessing) {
      this.processQueue();
    }
  }
  
  async processQueue() {
    this.isProcessing = true;
    while (this.queue.length > 0) {
      const currentTask = this.queue.shift();
      try {
        const result = await currentTask();
        print('Task result:', result);
      } catch (error) {
        console.error('Task error:', error);
      }
    }
    this.isProcessing = false;
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const asyncQueue = new AsyncQueue();

const tasks = [
  async () => {
    await delay(1000);
    return 'Task 1 Completed';
  },
  async () => {
    await delay(500);
    return 'Task 2 Completed';
  },
  async () => {
    await delay(200);
    throw new Error('Task 3 Failed');
  },
  async () => {
    await delay(300);
    return 'Task 4 Completed';
  }
];

tasks.forEach(task => asyncQueue.enqueue(task));
