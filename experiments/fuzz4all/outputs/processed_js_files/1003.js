class Task {
  #priority;
  
  constructor(name, priority) {
    this.name = name;
    this.#priority = priority;
  }

  get priority() {
    return this.#priority;
  }
  
  static compare(a, b) {
    return b.priority - a.priority;
  }
}

const delayedExecution = (delay, callback) => new Promise(resolve => {
  setTimeout(() => resolve(callback()), delay);
});

(async function() {
  const tasks = [
    new Task('Learn JavaScript', 2),
    new Task('Complete Project', 1),
    new Task('Do Exercise', 3)
  ];

  tasks.sort(Task.compare);

  for (const task of tasks) {
    const result = await delayedExecution(1000, () => `Executing: ${task.name}`);
    print(result);
  }

  const taskPromises = tasks.map(task => delayedExecution(500, () => task.name));
  const executedTasks = await Promise.all(taskPromises);
  
  print('All tasks executed:', executedTasks.join(', '));
})();
