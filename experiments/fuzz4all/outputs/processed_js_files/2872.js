class TaskManager {
  constructor() {
    this.tasks = new Map();
  }

  addTask(description, duration) {
    const id = Symbol(description);
    this.tasks.set(id, { description, duration, status: 'pending' });
    return id;
  }

  async executeTasks(concurrencyLimit) {
    const taskPromises = Array.from(this.tasks.entries()).map(([id, task]) =>
      this.runTask(id, task)
    );

    let i = 0;
    const results = [];
    while (i < taskPromises.length) {
      const chunk = taskPromises.slice(i, i + concurrencyLimit);
      const result = await Promise.all(chunk);
      results.push(...result);
      i += concurrencyLimit;
    }

    return results;
  }

  async runTask(id, task) {
    task.status = 'running';
    await new Promise(res => setTimeout(res, task.duration));
    task.status = 'completed';
    return `Task ${task.description} completed`;
  }
}

 
const delay = ms => new Promise(res => setTimeout(res, ms));

 
const taskManagerProxy = new Proxy(new TaskManager(), {
  get(target, property, receiver) {
    if (typeof target[property] === 'function') {
      return function (...args) {
        print(`Calling ${property} with arguments: ${JSON.stringify(args)}`);
        return target[property].apply(this, args);
      };
    }
    return Reflect.get(target, property, receiver);
  }
});

 
(async () => {
  const taskManager = taskManagerProxy;

  const task1 = taskManager.addTask('Download File', 1000);
  const task2 = taskManager.addTask('Process Data', 2000);
  const task3 = taskManager.addTask('Generate Report', 1500);

  print(await taskManager.executeTasks(2));
})();
