class AsyncManager {
  #tasks = [];
  #concurrency;
  constructor(concurrency) {
    this.#concurrency = concurrency;
  }

  addTask(task) {
    this.#tasks.push(task);
  }

  async run() {
    const workers = Array.from({ length: this.#concurrency }, () => this.#worker());
    await Promise.all(workers);
  }

  async #worker() {
    while (this.#tasks.length) {
      const task = this.#tasks.shift();
      await task();
    }
  }
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

(async () => {
  const manager = new AsyncManager(3);

   
  const tasks = Array.from({ length: 10 }, (_, i) => async () => {
    const { default: chalk } = await import('chalk');  
    print(chalk.green(`Running task ${i + 1}`));
    await delay(1000);  
    print(chalk.yellow(`Finished task ${i + 1}`));
  });

  tasks.forEach((task) => manager.addTask(task));

  print('Starting task execution');
  await manager.run();
  print('All tasks completed');
})();
Note: To execute this code, you will need to install the `chalk` package (`npm install chalk`) and run the script in an environment that supports ES module syntax and dynamic imports.