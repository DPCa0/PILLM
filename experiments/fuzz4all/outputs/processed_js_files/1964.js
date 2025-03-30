class AsyncQueue {
  constructor() {
    this.queue = [];
    this.pendingPromise = false;
  }

  enqueue(promiseFunc) {
    this.queue.push(promiseFunc);
    if (!this.pendingPromise) {
      this.dequeue();
    }
  }

  async dequeue() {
    if (this.queue.length === 0) {
      this.pendingPromise = false;
      return;
    }
    this.pendingPromise = true;
    const promiseFunc = this.queue.shift();
    try {
      await promiseFunc();
    } catch (err) {
      console.error(err);
    } finally {
      this.dequeue();
    }
  }
}

 
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const logWithDelay = async (msg, delayTime) => {
  await delay(delayTime);
  print(msg);
};

const queue = new AsyncQueue();
queue.enqueue(() => logWithDelay("Task 1", 1000));
queue.enqueue(() => logWithDelay("Task 2", 500));
queue.enqueue(() => logWithDelay("Task 3", 2000));
queue.enqueue(() => logWithDelay("Task 4", 300));
