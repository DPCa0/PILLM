class AsyncQueue {
  constructor() {
    this.queue = [];
    this.isProcessing = false;
  }
  
  async enqueue(task) {
    return new Promise((resolve, reject) => {
      this.queue.push(() => task().then(resolve).catch(reject));
      if (!this.isProcessing) this.processQueue();
    });
  }
  
  async processQueue() {
    this.isProcessing = true;
    while (this.queue.length) {
      const task = this.queue.shift();
      await task();
    }
    this.isProcessing = false;
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  const asyncQueue = new AsyncQueue();
  
  const tasks = [
    () => delay(1000).then(() => console.log('Task 1 completed')),
    () => delay(500).then(() => console.log('Task 2 completed')),
    () => delay(1500).then(() => console.log('Task 3 completed')),
    () => delay(800).then(() => console.log('Task 4 completed'))
  ];
  
  print('Starting task processing...');
  
  await Promise.all(tasks.map(task => asyncQueue.enqueue(task)));

  print('All tasks completed');
})();
