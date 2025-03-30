class AsyncQueue {
  constructor() {
    this.queue = [];
    this.pendingPromise = false;
  }

  enqueue(task) {
    return new Promise((resolve, reject) => {
      this.queue.push(() => task().then(resolve, reject));
      if (!this.pendingPromise) {
        this.dequeue();
      }
    });
  }

  async dequeue() {
    this.pendingPromise = true;
    const nextTask = this.queue.shift();
    if (nextTask) {
      await nextTask();
      this.dequeue();
    } else {
      this.pendingPromise = false;
    }
  }
}

async function exampleUsage() {
  const queue = new AsyncQueue();

  const delay = (ms) => new Promise(res => setTimeout(res, ms));

  const asyncTask = async (id) => {
    print(`Task ${id} start`);
    await delay(1000);
    print(`Task ${id} end`);
  };

  const tasks = [() => asyncTask(1), () => asyncTask(2), () => asyncTask(3)];

  const results = await Promise.all(tasks.map(task => queue.enqueue(task)));

  print('All tasks completed');
}

exampleUsage();
