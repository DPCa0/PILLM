class AsyncIterableQueue {
  constructor() {
    this.queue = [];
    this.resolveQueue = [];
  }

  enqueue(value) {
    if (this.resolveQueue.length) {
      this.resolveQueue.shift()(value);
    } else {
      this.queue.push(value);
    }
  }

  async *[Symbol.asyncIterator]() {
    while (true) {
      if (this.queue.length) {
        yield this.queue.shift();
      } else {
        yield await new Promise(resolve => this.resolveQueue.push(resolve));
      }
    }
  }
}

async function processItems() {
  const queue = new AsyncIterableQueue();

  setTimeout(() => queue.enqueue(1), 1000);
  setTimeout(() => queue.enqueue(2), 2000);
  setTimeout(() => queue.enqueue(3), 3000);

  for await (const item of queue) {
    print(`Processing item: ${item}`);
    if (item === 3) break;
  }
}

async function run() {
  try {
    await Promise.race([
      processItems(),
      (async () => {
        throw new Error("Timeout");
      })()
    ]);
  } catch (err) {
    console.error(err.message);
  }
}

run();
