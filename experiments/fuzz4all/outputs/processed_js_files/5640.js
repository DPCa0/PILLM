const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

class AsyncQueue {
  constructor() {
    this.queue = [];
    this.processing = false;
  }

  enqueue(fn) {
    this.queue.push(fn);
    if (!this.processing) {
      this.processQueue();
    }
  }

  async processQueue() {
    if (this.queue.length === 0) {
      this.processing = false;
      return;
    }

    this.processing = true;
    const fn = this.queue.shift();
    await fn();
    this.processQueue();
  }
}

const apiCall = async (id) => {
  await delay(1000);
  print(`Processed item ${id}`);
};

const runComplexTask = async () => {
  const asyncQueue = new AsyncQueue();

  for (let i = 1; i <= 5; i++) {
    asyncQueue.enqueue(async () => {
      print(`Starting item ${i}`);
      await apiCall(i);
    });
  }
};

runComplexTask();
