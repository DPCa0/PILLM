class AsyncWorker {
  #results = [];

  constructor(tasks) {
    this.tasks = tasks;
  }

  async execute() {
    await Promise.all(this.tasks.map(task => this.#wrapTask(task)));
    return this.#results;
  }

  async #wrapTask(task) {
    try {
      const result = await task();
      this.#results.push({ status: 'fulfilled', value: result });
    } catch (error) {
      this.#results.push({ status: 'rejected', reason: error });
    }
  }
}

function* taskGenerator() {
  let i = 0;
  while (i < 5) {
    yield () => new Promise((resolve, reject) => {
      setTimeout(() => Math.random() > 0.3 ? resolve(`Task ${i++} done`) : reject(`Task ${i++} failed`), 1000);
    });
  }
}

(async () => {
  const tasks = [...taskGenerator()];
  const worker = new AsyncWorker(tasks);
  const results = await worker.execute();
  
  print('Results:', results);
})();
