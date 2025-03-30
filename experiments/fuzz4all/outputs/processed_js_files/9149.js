class AsyncQueue {
  constructor() {
    this.queue = [];
    this.pendingPromise = false;
  }

  enqueue(fn) {
    return new Promise((resolve, reject) => {
      this.queue.push({ fn, resolve, reject });
      this.dequeue();
    });
  }

  async dequeue() {
    if (this.pendingPromise || !this.queue.length) return;
    const { fn, resolve, reject } = this.queue.shift();
    this.pendingPromise = true;
    try {
      const result = await fn();
      resolve(result);
    } catch (err) {
      reject(err);
    } finally {
      this.pendingPromise = false;
      this.dequeue();
    }
  }
}

 
const asyncQueue = new AsyncQueue();

const asyncTask = async (id) => {
  await new Promise((r) => setTimeout(r, 1000));
  print(`Task ${id} completed`);
};

(async () => {
  await asyncQueue.enqueue(() => asyncTask(1));
  await asyncQueue.enqueue(() => asyncTask(2));
  await asyncQueue.enqueue(() => asyncTask(3));
  print('All tasks completed');
})();
