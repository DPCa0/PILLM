class TaskScheduler {
  constructor() {
    this.tasks = new Map();
  }

  addTask(taskName, taskFunction, delay) {
    if (this.tasks.has(taskName)) {
      console.error(`Task ${taskName} already exists.`);
      return;
    }

    const taskPromise = new Promise((resolve) => {
      const id = setTimeout(() => {
        resolve(taskFunction());
        this.tasks.delete(taskName);
      }, delay);

      this.tasks.set(taskName, id);
    });

    taskPromise.then(result => {
      print(`Task ${taskName} completed with result:`, result);
    });
  }

  cancelTask(taskName) {
    if (!this.tasks.has(taskName)) {
      console.error(`Task ${taskName} not found.`);
      return;
    }

    clearTimeout(this.tasks.get(taskName));
    this.tasks.delete(taskName);
    print(`Task ${taskName} canceled.`);
  }
}

 
const scheduler = new TaskScheduler();
scheduler.addTask('task1', () => ({ message: 'Hello, world!' }), 2000);
scheduler.addTask('task2', () => 'Goodbye, world!', 5000);
scheduler.cancelTask('task1');

setTimeout(() => scheduler.cancelTask('task2'), 1000);
