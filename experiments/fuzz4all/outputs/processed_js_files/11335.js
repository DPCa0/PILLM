class Task {
  #status;
  constructor(name) {
    this.name = name;
    this.#status = 'pending';
  }
  
  async execute() {
    print(`Starting task: ${this.name}`);
    this.#status = 'in progress';
    await new Promise(resolve => setTimeout(resolve, Math.random() * 2000));
    this.#status = 'completed';
    print(`Completed task: ${this.name}`);
  }

  getStatus() {
    return this.#status;
  }
}

const taskManager = {
  tasks: new Set(),

  addTask(name) {
    const task = new Task(name);
    this.tasks.add(task);
    return task;
  },

  async runAllTasks() {
    await Promise.all(Array.from(this.tasks).map(task => task.execute()));
  },

  showStatuses() {
    this.tasks.forEach(task => {
      print(`Task: ${task.name}, Status: ${task.getStatus()}`);
    });
  }
};

(async function() {
  const task1 = taskManager.addTask('Task 1');
  const task2 = taskManager.addTask('Task 2');
  const task3 = taskManager.addTask('Task 3');

  await taskManager.runAllTasks();
  taskManager.showStatuses();
})();
