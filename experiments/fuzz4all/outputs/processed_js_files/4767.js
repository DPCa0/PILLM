class AsyncQueue {
  constructor() {
    this.queue = [];
    this.pendingPromise = false;
  }

  enqueue(asyncFunction) {
    return new Promise((resolve, reject) => {
      this.queue.push({
        asyncFunction: asyncFunction,
        resolve: resolve,
        reject: reject,
      });
      this.processQueue();
    });
  }

  async processQueue() {
    if (this.pendingPromise || this.queue.length === 0) {
      return;
    }

    const { asyncFunction, resolve, reject } = this.queue.shift();
    this.pendingPromise = true;

    try {
      const result = await asyncFunction();
      resolve(result);
    } catch (error) {
      reject(error);
    } finally {
      this.pendingPromise = false;
      this.processQueue();
    }
  }
}

 
const queue = new AsyncQueue();

const delayedLog = (msg, delay) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      print(msg);
      resolve();
    }, delay);
  });
};

(async () => {
  await queue.enqueue(() => delayedLog('First log after 2s', 2000));
  await queue.enqueue(() => delayedLog('Second log after 1s', 1000));
  await queue.enqueue(() => delayedLog('Third log immediately', 0));
})();
