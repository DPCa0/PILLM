class Task {
  #status = 'pending';
  constructor(name, delay) {
    this.name = name;
    this.delay = delay;
  }

  async #performTask() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.#status = 'completed';
        resolve(`Task "${this.name}" completed`);
      }, this.delay);
    });
  }

  async start() {
    print(`Starting task "${this.name}"...`);
    let result = await this.#performTask();
    print(result);
    return result;
  }

  static async runTasksConcurrently(tasks) {
    const results = await Promise.all(tasks.map(task => task.start()));
    print('All tasks completed:', results);
  }
}

(async function() {
  const tasks = [
    new Task('Task 1', 1000),
    new Task('Task 2', 2000),
    new Task('Task 3', 1500)
  ];
  await Task.runTasksConcurrently(tasks);
})();
