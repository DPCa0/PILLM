class AsyncIterableQueue {
  constructor() {
    this.queue = [];
    this.resolve = null;
  }
  
  async enqueue(item) {
    if (this.resolve) {
      this.resolve({ value: item, done: false });
      this.resolve = null;
    } else {
      this.queue.push(item);
    }
  }
  
  asyncIterator() {
    return {
      next: () => new Promise((resolve) => {
        if (this.queue.length) {
          resolve({ value: this.queue.shift(), done: false });
        } else {
          this.resolve = resolve;
        }
      })
    };
  }
  
  [Symbol.asyncIterator]() {
    return this.asyncIterator();
  }
}

const asyncQueue = new AsyncIterableQueue();

(async () => {
  const consumer = async () => {
    for await (const item of asyncQueue) {
      print(`Consumed: ${item}`);
    }
  };
  
  const producer = async () => {
    for (let i = 0; i < 5; i++) {
      print(`Produced: ${i}`);
      await asyncQueue.enqueue(i);
    }
  };
  
  await Promise.all([consumer(), producer()]);
})();
