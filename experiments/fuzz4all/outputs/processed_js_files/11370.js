class Task {
  constructor(name, isCompleted = false) {
    this.name = name;
    this.isCompleted = isCompleted;
  }
}

class TaskManager {
  constructor() {
    this.tasks = new Set();
  }

  addTask(task) {
    this.tasks.add(task);
  }

  completeTask(taskName) {
    for (const task of this.tasks) {
      if (task.name === taskName) {
        task.isCompleted = true;
      }
    }
  }

  get completedTasks() {
    return [...this.tasks].filter(task => task.isCompleted);
  }

  *[Symbol.iterator]() {
    yield* this.tasks;
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
  const taskManager = new TaskManager();

  taskManager.addTask(new Task('Learn JavaScript'));
  taskManager.addTask(new Task('Write Code'));
  taskManager.addTask(new Task('Test Application'));

  print('Initial Tasks:');
  for (const task of taskManager) {
    print(`- ${task.name} [${task.isCompleted ? 'Completed' : 'Pending'}]`);
  }

  await delay(1000);
  taskManager.completeTask('Learn JavaScript');

  print('\nCompleted Tasks after 1 second:');
  for (const task of taskManager.completedTasks) {
    print(`- ${task.name}`);
  }
})();
