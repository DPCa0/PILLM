class AsyncPriorityQueue {
  constructor() {
    this.queue = [];
    this.resolvers = [];
  }

  enqueue(priority, item) {
    const entry = { priority, item };
    if (this.resolvers.length) {
      this.resolvers.shift()(entry);
    } else {
      this.queue.push(entry);
      this.queue.sort((a, b) => a.priority - b.priority);
    }
  }

  async dequeue() {
    if (this.queue.length) {
      return this.queue.shift();
    }
    return new Promise((resolve) => this.resolvers.push(resolve));
  }
}

async function processQueue(queue) {
  while (true) {
    const { priority, item } = await queue.dequeue();
    print(`Processing item ${item} with priority ${priority}`);
    await new Promise(r => setTimeout(r, Math.random() * 1000));  
  }
}

(async () => {
  const queue = new AsyncPriorityQueue();

  processQueue(queue);

  queue.enqueue(2, 'task1');
  queue.enqueue(1, 'task2');
  queue.enqueue(3, 'task3');

  setTimeout(() => queue.enqueue(0, 'task4'), 1500);
  setTimeout(() => queue.enqueue(4, 'task5'), 1000);
})();
