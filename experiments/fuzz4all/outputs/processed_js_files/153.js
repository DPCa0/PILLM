class AsyncQueue {
  constructor() {
    this.tasks = [];
    this.pendingPromise = false;
  }

  enqueue(task) {
    return new Promise((resolve, reject) => {
      this.tasks.push(() => task().then(resolve, reject));
      if (!this.pendingPromise) {
        this.dequeue();
      }
    });
  }

  dequeue() {
    if (this.tasks.length > 0) {
      this.pendingPromise = true;
      const task = this.tasks.shift();
      task().finally(() => {
        this.pendingPromise = false;
        this.dequeue();
      });
    }
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function complexTask(id) {
  print(`Starting task ${id}`);
  await delay(Math.random() * 1000);
  print(`Completed task ${id}`);
}

const queue = new AsyncQueue();

[1, 2, 3, 4, 5].forEach(i => queue.enqueue(() => complexTask(i)));

 
async function* range(start, end) {
  for (let i = start; i < end; i++) {
    yield await Promise.resolve(i);
  }
}

(async () => {
  for await (const num of range(5, 10)) {
    queue.enqueue(() => complexTask(num));
  }
})();
