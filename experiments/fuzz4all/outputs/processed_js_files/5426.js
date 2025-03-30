class Task {
  constructor(name, duration) {
    this.name = name;
    this.duration = duration;
  }

  async execute() {
    print(`Starting task: ${this.name}`);
    return new Promise(resolve => setTimeout(() => {
      print(`Completed task: ${this.name}`);
      resolve(this);
    }, this.duration));
  }
}

class TaskManager {
  constructor() {
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push(task);
  }

  async runAllTasks() {
    for await (let completedTask of this.tasks.map(task => task.execute())) {
      print(`Task finished: ${completedTask.name}`);
    }
  }
}

 
(async () => {
  const taskManager = new TaskManager();

   
  const task1 = new Task("Download File", Math.random() * 2000);
  const task2 = new Task("Process Data", Math.random() * 3000);
  const task3 = new Task("Upload Results", Math.random() * 1000);

   
  taskManager.addTask(task1);
  taskManager.addTask(task2);
  taskManager.addTask(task3);

   
  await taskManager.runAllTasks();
})();
