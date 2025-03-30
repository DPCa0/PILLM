class AsyncQueue {
  constructor() {
    this.queue = [];
    this.pendingPromise = false;
  }

  enqueue(task) {
    return new Promise((resolve, reject) => {
      this.queue.push({ task, resolve, reject });
      this.dequeue();
    });
  }

  async dequeue() {
    if (this.pendingPromise) return false;
    const item = this.queue.shift();
    if (!item) return false;
    try {
      this.pendingPromise = true;
      const result = await item.task();
      item.resolve(result);
    } catch (error) {
      item.reject(error);
    } finally {
      this.pendingPromise = false;
      this.dequeue();
    }
    return true;
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

(async function main() {
  const queue = new AsyncQueue();

  const task1 = async () => {
    await delay(1000);
    print('Task 1 complete');
    return 1;
  };

  const task2 = async () => {
    await delay(500);
    print('Task 2 complete');
    return 2;
  };

  const results = await Promise.all([
    queue.enqueue(task1),
    queue.enqueue(task2),
    queue.enqueue(task1),
    queue.enqueue(task2)
  ]);

  print('Results:', results);
})();
