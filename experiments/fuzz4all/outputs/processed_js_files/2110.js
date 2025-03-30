class TaskManager {
  constructor() {
    this.tasks = new Map();
    this.currentId = 0;
  }

  addTask(description, priority = 3) {
    this.tasks.set(++this.currentId, { description, priority, completed: false });
  }

  completeTask(id) {
    if (this.tasks.has(id)) {
      this.tasks.get(id).completed = true;
    }
  }

  *[Symbol.iterator]() {
    const sortedTasks = [...this.tasks.entries()].sort((a, b) => a[1].priority - b[1].priority);
    for (const [id, task] of sortedTasks) {
      yield { id, ...task };
    }
  }

  async delayCompleteTask(id, delay) {
    await new Promise(resolve => setTimeout(resolve, delay));
    this.completeTask(id);
  }
}

(async () => {
  const taskManager = new TaskManager();
  taskManager.addTask("Write blog post", 1);
  taskManager.addTask("Update resume", 2);
  taskManager.addTask("Plan vacation", 5);

  print("Tasks before completion:");
  for (const task of taskManager) {
    print(task);
  }

  await taskManager.delayCompleteTask(1, 2000);
  print("\nTasks after completing the first task:");
  for (const task of taskManager) {
    print(task);
  }
})();
