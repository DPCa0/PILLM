class Task {
  constructor(name) {
    this.name = name;
    this.completed = false;
  }

  complete() {
    this.completed = true;
  }
}

class TaskManager {
  #tasks = new Set();  

  addTask(name) {
    this.#tasks.add(new Task(name));
  }

  get pendingTasks() {
    return [...this.#tasks].filter(task => !task.completed);
  }

  static logTasks(tasks) {
    tasks.forEach(task => print(`${task.name}: ${task.completed ? 'Completed' : 'Pending'}`));
  }
}

async function simulateTaskCompletion(taskManager) {
  for (const task of taskManager.pendingTasks) {
    await new Promise(resolve => setTimeout(resolve, 1000));  
    task.complete();
    print(`Completed: ${task.name}`);
  }
}

const taskManager = new TaskManager();

taskManager.addTask('Learn JavaScript');
taskManager.addTask('Practice ES6');
taskManager.addTask('Understand async/await');

print('Initial Tasks:');
TaskManager.logTasks(taskManager.pendingTasks);

simulateTaskCompletion(taskManager)
  .then(() => {
    print('\nAll Tasks After Completion:');
    TaskManager.logTasks(taskManager.pendingTasks);
  })
  .catch(error => console.error(error));
