class AsyncQueue {
  constructor() {
    this.queue = [];
    this.resolvers = [];
  }

  enqueue(value) {
    if (this.resolvers.length) {
      const resolve = this.resolvers.shift();
      resolve({ value, done: false });
    } else {
      this.queue.push(value);
    }
  }

  async *dequeue() {
    while (true) {
      if (this.queue.length) {
        yield { value: this.queue.shift(), done: false };
      } else {
        yield await new Promise((resolve) => this.resolvers.push(resolve));
      }
    }
  }
}

async function main() {
  const asyncQueue = new AsyncQueue();

  async function producer() {
    ['apple', 'banana', 'cherry'].forEach((fruit, index) => {
      setTimeout(() => asyncQueue.enqueue(fruit), index * 1000);
    });
  }

  async function consumer() {
    for await (const item of asyncQueue.dequeue()) {
      print(item.value);
      if (item.value === 'cherry') break;
    }
  }

  producer();
  await consumer();
}

main();
