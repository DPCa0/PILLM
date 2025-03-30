class AsyncQueue {
  constructor() {
    this.queue = [];
    this.processing = false;
  }

  async enqueue(fn) {
    return new Promise((resolve, reject) => {
      this.queue.push({ fn, resolve, reject });
      this.processNext();
    });
  }

  async processNext() {
    if (this.processing || this.queue.length === 0) return;
    this.processing = true;
    const { fn, resolve, reject } = this.queue.shift();

    try {
      const result = await fn();
      resolve(result);
    } catch (error) {
      reject(error);
    } finally {
      this.processing = false;
      this.processNext();
    }
  }
}

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

(async () => {
  const queue = new AsyncQueue();

  const results = await Promise.all([
    queue.enqueue(async () => {
      await delay(1000);
      print('Task 1 completed');
      return 'Result 1';
    }),
    queue.enqueue(async () => {
      await delay(500);
      print('Task 2 completed');
      return 'Result 2';
    }),
    queue.enqueue(async () => {
      await delay(2000);
      print('Task 3 completed');
      return 'Result 3';
    }),
  ]);

  print('All tasks completed:', results);
})();
