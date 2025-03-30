class AsyncPriorityQueue {
  constructor() {
    this.queue = [];
  }

  enqueue(promiseGenerator, priority = 0) {
    const promiseObj = { promiseGenerator, priority };
    this.queue.push(promiseObj);
    this.queue.sort((a, b) => b.priority - a.priority);
  }

  async dequeue() {
    if (this.queue.length === 0) throw new Error("Queue is empty");
    const { promiseGenerator } = this.queue.shift();
    return await promiseGenerator();
  }

  get size() {
    return this.queue.length;
  }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const queue = new AsyncPriorityQueue();
queue.enqueue(() => delay(1000).then(() => print("Task 1 completed")), 2);
queue.enqueue(() => delay(500).then(() => print("Task 2 completed")), 3);
queue.enqueue(() => delay(300).then(() => print("Task 3 completed")), 1);

(async function processQueue() {
  while (queue.size > 0) {
    await queue.dequeue();
  }
})();
