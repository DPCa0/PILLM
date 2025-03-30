class Task {
  #taskName;
  constructor(taskName) {
    this.#taskName = taskName;
    this.complete = false;
  }

  async perform() {
    this.complete = await new Promise((resolve) => {
      print(`Performing task: ${this.#taskName}`);
      setTimeout(() => resolve(true), Math.random() * 2000);
    });
  }
}

class TaskRunner {
  #tasks;
  constructor() {
    this.#tasks = [];
  }

  addTask(task) {
    this.#tasks.push(task);
  }

  async runTasks() {
    await Promise.all(this.#tasks.map(task => task.perform()));
    print('All tasks completed');
  }
}

 
(async () => {
  const taskRunner = new TaskRunner();
  
  ['task1', 'task2', 'task3'].forEach(name => {
    const task = new Task(name);
    taskRunner.addTask(task);
  });

  await taskRunner.runTasks();
})();

 
const proxyHandler = {
  get(target, property) {
    if (property in target) {
      return Reflect.get(target, property);
    }
    print(`Property ${property} not found`);
    return undefined;
  }
};

const tasks = new Proxy(new TaskRunner(), proxyHandler);
tasks.addTask(new Task('task4'));
tasks.runTasks();
