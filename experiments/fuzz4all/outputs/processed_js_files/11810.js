class Task {
  constructor(name, priority) {
    this.name = name;
    this.priority = priority;
  }

  describe() {
    return `${this.name} [${this.priority}]`;
  }
}

class Scheduler {
  constructor() {
    this.tasks = new Map();
  }

  addTask(name, priority) {
    if (!this.tasks.has(name)) {
      this.tasks.set(name, new Task(name, priority));
    }
  }

  removeTask(name) {
    this.tasks.delete(name);
  }

  *[Symbol.iterator]() {
    yield* [...this.tasks.values()].sort((a, b) => b.priority - a.priority);
  }

  async executeTasks() {
    for (let task of this) {
      await this._simulateAsyncTask(task);
    }
  }

  async _simulateAsyncTask(task) {
    return new Promise((resolve) => {
      setTimeout(() => {
        print(`Executing: ${task.describe()}`);
        resolve();
      }, 1000);
    });
  }
}

(async () => {
  const scheduler = new Scheduler();
  scheduler.addTask("Design Pattern Review", 3);
  scheduler.addTask("Write Blog Post", 2);
  scheduler.addTask("Finish Project", 5);

  print("Scheduled Tasks:");
  for (let task of scheduler) {
    print(task.describe());
  }

  print("\nStarting execution...\n");
  await scheduler.executeTasks();
})();
