class AsyncQueue {
  #tasks = [];
  #running = false;

  enqueue(task) {
    return new Promise((resolve, reject) => {
      this.#tasks.push(async () => {
        try {
          const result = await task();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
      this.#run();
    });
  }

  async #run() {
    if (this.#running || this.#tasks.length === 0) return;
    this.#running = true;
    const task = this.#tasks.shift();
    await task();
    this.#running = false;
    this.#run();
  }
}

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const queue = new AsyncQueue();

const logTask = (id, duration) => async () => {
  print(`Task ${id} started`);
  await delay(duration);
  print(`Task ${id} finished`);
};

(async () => {
  queue.enqueue(logTask(1, 1000));
  queue.enqueue(logTask(2, 500));
  queue.enqueue(logTask(3, 1500));
  queue.enqueue(logTask(4, 800));
})();
