class Task {
  constructor(name, duration) {
    this.name = name;
    this.duration = duration;
  }

  async execute() {
    print(`Executing task: ${this.name}`);
    await this.#delay(this.duration);
    print(`Task ${this.name} completed`);
    return this.name;
  }

  #delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

class TaskManager {
  #tasks = new Map();

  addTask(name, duration) {
    const task = new Task(name, duration);
    this.#tasks.set(name, task);
  }

  async runAll() {
    print("Running all tasks in parallel...");
    const results = await Promise.all([...this.#tasks.values()].map(task => task.execute()));
    print("All tasks completed:", results);
  }

  async runSequential() {
    print("Running all tasks sequentially...");
    for (const task of this.#tasks.values()) {
      await task.execute();
    }
    print("All tasks completed sequentially");
  }

  getTaskNames() {
    return [...this.#tasks.keys()];
  }
}

 
const managerHandler = {
  get(target, prop, receiver) {
    if (typeof target[prop] === 'function') {
      return (...args) => {
        print(`Method called: ${prop} with arguments: ${args}`);
        return Reflect.apply(target[prop], target, args);
      };
    }
    return Reflect.get(target, prop, receiver);
  }
};

const taskManager = new Proxy(new TaskManager(), managerHandler);

 
function* taskGenerator() {
  yield ['Task1', 2000];
  yield ['Task2', 1000];
  yield ['Task3', 1500];
}

for (const [name, duration] of taskGenerator()) {
  taskManager.addTask(name, duration);
}

print('Added tasks:', taskManager.getTaskNames());
taskManager.runAll().then(() => {
  print('Parallel execution finished');
  return taskManager.runSequential();
}).then(() => {
  print('Sequential execution finished');
});
