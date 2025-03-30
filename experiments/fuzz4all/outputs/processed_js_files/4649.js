class TaskScheduler {
  constructor() {
    this.taskQueue = [];
    this.running = false;
  }

  addTask(task, delay) {
    return new Promise((resolve, reject) => {
      const job = async () => {
        try {
          const result = await task();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      };

      this.taskQueue.push({ job, delay });
      if (!this.running) this.runTasks();
    });
  }

  async runTasks() {
    this.running = true;
    while (this.taskQueue.length) {
      const { job, delay } = this.taskQueue.shift();
      await new Promise(res => setTimeout(res, delay));
      await job();
    }
    this.running = false;
  }
}

const asyncOperation = () =>
  new Promise((res, rej) =>
    Math.random() > 0.2 ? res("Task completed!") : rej("Task failed!")
  );

const scheduler = new TaskScheduler();

(async function () {
  const tasks = [
    scheduler.addTask(asyncOperation, 1000),
    scheduler.addTask(asyncOperation, 2000),
    scheduler.addTask(asyncOperation, 3000),
  ];

  try {
    const results = await Promise.allSettled(tasks);
    results.forEach((result, index) => {
      print(`Task ${index + 1}: ${result.status} - ${result.reason || result.value}`);
    });
  } catch (error) {
    console.error(`Error occurred: ${error}`);
  }
})();
