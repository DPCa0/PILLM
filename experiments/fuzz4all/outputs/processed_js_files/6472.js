class Task {
  constructor(title) {
    this.title = title;
    this.done = false;
  }
  complete() {
    this.done = true;
  }
  toString() {
    return `${this.title} - ${this.done ? 'Complete' : 'Pending'}`;
  }
}

const taskManager = {
  tasks: new Set(),
  addTask(title) {
    const task = new Task(title);
    this.tasks.add(task);
    return task;
  },
  removeTask(task) {
    this.tasks.delete(task);
  },
  get pendingTasks() {
    return Array.from(this.tasks).filter(task => !task.done);
  }
};

const loggerProxy = new Proxy(taskManager, {
  get(target, property) {
    print(`Accessing property: ${property}`);
    return target[property];
  },
  set(target, property, value) {
    print(`Setting property: ${property} to ${value}`);
    target[property] = value;
    return true;
  },
  apply(target, thisArg, argumentsList) {
    print(`Calling method: ${target.name}`);
    return target.apply(thisArg, argumentsList);
  }
});

(async function main() {
  const task1 = loggerProxy.addTask('Learn Proxies');
  const task2 = loggerProxy.addTask('Master Asynchronous JS');
  
  print(task1.toString());
  print(task2.toString());

  task1.complete();
  
  print(task1.toString());

  loggerProxy.removeTask(task2);

  print(`Pending Tasks: ${loggerProxy.pendingTasks.length}`);

   
  await new Promise(resolve => setTimeout(resolve, 1000));

  loggerProxy.pendingTasks.forEach(task => print(task.toString()));
})();
