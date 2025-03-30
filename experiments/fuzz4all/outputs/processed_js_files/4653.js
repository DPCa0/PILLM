class Task {
  constructor(title) {
    this.title = title;
    this.completed = false;
  }
}

class TaskManager {
  constructor() {
    this.tasks = new Set();
  }
  
  addTask(title) {
    const task = new Task(title);
    this.tasks.add(task);
    print(`Task added: ${title}`);
  }
  
  completeTask(title) {
    const task = [...this.tasks].find(task => task.title === title);
    if (task) {
      task.completed = true;
      print(`Task completed: ${title}`);
    } else {
      console.error(`Task not found: ${title}`);
    }
  }
  
  *getTasksByCompletion(completed = true) {
    for (const task of this.tasks) {
      if (task.completed === completed) {
        yield task;
      }
    }
  }
}

const asyncDelay = ms => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  const taskManager = new TaskManager();

  taskManager.addTask('Learn JavaScript');
  taskManager.addTask('Write Code');
  taskManager.addTask('Review PRs');

  taskManager.completeTask('Write Code');

  print('Completed Tasks:');
  for (const task of taskManager.getTasksByCompletion()) {
    print(`- ${task.title}`);
  }

  print('Pending Tasks:');
  for (const task of taskManager.getTasksByCompletion(false)) {
    print(`- ${task.title}`);
  }

  await asyncDelay(2000);
  print('All tasks processed.');
})();
