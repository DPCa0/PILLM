class TaskManager {
  constructor() {
    this.tasks = new Map();
  }

  addTask(taskName, duration) {
    this.tasks.set(taskName, { duration, isComplete: false });
    return this;
  }

  completeTask(taskName) {
    const task = this.tasks.get(taskName);
    if (task) {
      task.isComplete = true;
    }
    return this;
  }

  async executeTasks() {
    const taskPromises = [];
    for (let [taskName, { duration, isComplete }] of this.tasks) {
      if (!isComplete) {
        taskPromises.push(this._executeTask(taskName, duration));
      }
    }
    await Promise.all(taskPromises);
  }

  _executeTask(taskName, duration) {
    return new Promise((resolve) => {
      setTimeout(() => {
        print(`Task ${taskName} completed.`);
        this.completeTask(taskName);
        resolve();
      }, duration);
    });
  }
}

(async () => {
  const taskManager = new TaskManager();
  taskManager
    .addTask('Task 1', 1000)
    .addTask('Task 2', 2000)
    .addTask('Task 3', 1500);

  print('Executing tasks...');
  await taskManager.executeTasks();
  print('All tasks have been executed.');
})();
