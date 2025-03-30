class AsyncQueue {
  constructor() {
    this.queue = [];
    this.processing = false;
  }

  async processQueue() {
    if (this.processing) return;
    this.processing = true;
    while (this.queue.length) {
      const task = this.queue.shift();
      await task();
    }
    this.processing = false;
  }

  enqueue(task) {
    this.queue.push(task);
    this.processQueue();
  }
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

(async function main() {
  const aq = new AsyncQueue();

   
  const _ = await import('https://cdn.jsdelivr.net/npm/lodash-es/lodash.min.js');

  const tasks = [
    async () => {
      print(_.capitalize('first task started'));
      await sleep(1000);
      print(_.capitalize('first task completed'));
    },
    async () => {
      print(_.capitalize('second task started'));
      await sleep(500);
      print(_.capitalize('second task completed'));
    },
    async () => {
      print(_.capitalize('third task started'));
      await sleep(700);
      print(_.capitalize('third task completed'));
    }
  ];

  for (const task of tasks) {
    aq.enqueue(task);
  }
})();
