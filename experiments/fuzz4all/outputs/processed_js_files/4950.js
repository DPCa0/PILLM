class AsyncQueue {
  constructor() {
    this.queue = [];
    this.isProcessing = false;
  }

  enqueue(promiseFunction) {
    this.queue.push(promiseFunction);
    if (!this.isProcessing) {
      this.processQueue();
    }
  }

  async processQueue() {
    this.isProcessing = true;
    while (this.queue.length > 0) {
      const promiseFunction = this.queue.shift();
      try {
        await promiseFunction();
      } catch (error) {
        console.error('Error processing queue:', error);
      }
    }
    this.isProcessing = false;
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const logWithDelay = async (message, delayTime) => {
  await delay(delayTime);
  print(message);
};

const queue = new AsyncQueue();

queue.enqueue(() => logWithDelay('Processing task 1', 1000));
queue.enqueue(() => logWithDelay('Processing task 2', 500));
queue.enqueue(() => logWithDelay('Processing task 3', 2000));
queue.enqueue(() => logWithDelay('Processing task 4', 1500));

(async () => {
  await delay(6000);
  print('All tasks should be done by now.');
})();
