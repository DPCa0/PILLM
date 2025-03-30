class AsyncIterableQueue {
  constructor() {
    this.queue = [];
    this.pendingPromises = [];
  }

  enqueue(item) {
    if (this.pendingPromises.length > 0) {
      const resolve = this.pendingPromises.shift();
      resolve({ value: item, done: false });
    } else {
      this.queue.push(item);
    }
  }

  [Symbol.asyncIterator]() {
    return this;
  }

  async next() {
    if (this.queue.length > 0) {
      return { value: this.queue.shift(), done: false };
    }
    
    return new Promise((resolve) => {
      this.pendingPromises.push(resolve);
    });
  }
}

async function* asyncGenerator() {
  yield* [1, 2, 3];
  await new Promise((resolve) => setTimeout(resolve, 1000));
  yield* [4, 5, 6];
}

async function processQueue() {
  const queue = new AsyncIterableQueue();
  (async () => {
    for await (const item of asyncGenerator()) {
      print(`Enqueued: ${item}`);
      queue.enqueue(item);
    }
    queue.enqueue(null);  
  })();

  for await (const item of queue) {
    if (item === null) break;
    print(`Processed: ${item}`);
  }
}

processQueue();
