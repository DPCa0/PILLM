class Task {
  constructor(name) {
    this.name = name;
    this.completed = false;
  }

  complete() {
    this.completed = true;
  }
}

const tasks = new Proxy([], {
  get(target, prop, receiver) {
    if (prop === 'completedTasks') {
      return target.filter(task => task.completed);
    }
    return Reflect.get(...arguments);
  }
});

const addTask = (taskName) => {
  const task = new Task(taskName);
  tasks.push(task);
  return task;
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  const task1 = addTask('Write Code');
  const task2 = addTask('Review Code');
  const task3 = addTask('Test Code');

  for await (const task of [task1, task2, task3]) {
    print(`Working on: ${task.name}`);
    await delay(1000);  
    task.complete();
    print(`Completed: ${task.name}`);
  }

  print('All tasks completed:', tasks.completedTasks.map(t => t.name));
})();
