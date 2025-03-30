class AsyncQueue {
  constructor() {
    this.queue = [];
    this.processing = false;
  }

  enqueue(asyncFunc) {
    this.queue.push(asyncFunc);
    if (!this.processing) {
      this.processing = true;
      this._processQueue();
    }
  }

  async _processQueue() {
    while (this.queue.length > 0) {
      const asyncFunc = this.queue.shift();
      try {
        await asyncFunc();
      } catch (err) {
        console.error(`Error processing task: ${err}`);
      }
    }
    this.processing = false;
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const asyncTask = async (msg, time) => {
  await delay(time);
  print(msg);
};

const queue = new AsyncQueue();

queue.enqueue(() => asyncTask('Task 1 Complete', 1000));
queue.enqueue(() => asyncTask('Task 2 Complete', 500));
queue.enqueue(() => asyncTask('Task 3 Complete', 300));
queue.enqueue(() => asyncTask('Task 4 Complete', 700));

(async () => {
  await delay(2500);
  queue.enqueue(() => asyncTask('Task 5 Complete', 200));
})();
