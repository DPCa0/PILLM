class AsyncQueue {
  constructor() {
    this.queue = [];
    this.pendingPromise = false;
  }
  
  async enqueue(task) {
    return new Promise((resolve, reject) => {
      this.queue.push(() => task().then(resolve, reject));
      if (!this.pendingPromise) {
        this.dequeue();
      }
    });
  }

  async dequeue() {
    if (this.queue.length) {
      this.pendingPromise = true;
      const task = this.queue.shift();
      try {
        await task();
      } finally {
        this.pendingPromise = false;
        this.dequeue();
      }
    }
  }
}

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

(async () => {
  const queue = new AsyncQueue();

  const tasks = [
    () => delay(1000).then(() => console.log('Task 1 complete')),
    () => delay(500).then(() => console.log('Task 2 complete')),
    () => delay(300).then(() => console.log('Task 3 complete')),
    () => delay(200).then(() => console.log('Task 4 complete')),
  ];

  tasks.forEach(task => queue.enqueue(task));

  await queue.enqueue(() => delay(100).then(() => print('All tasks queued')));
})();
