 

class Task {
  constructor(name, priority) {
    this.name = name;
    this.priority = priority;
    this.isCompleted = false;
  }

  completeTask() {
    this.isCompleted = true;
  }

  toString() {
    return `Task: ${this.name}, Priority: ${this.priority}, Completed: ${this.isCompleted}`;
  }
}

class TaskManager {
  #tasks = [];

  addTask(task) {
    this.#tasks.push(task);
  }

  removeTask(taskName) {
    this.#tasks = this.#tasks.filter(task => task.name !== taskName);
  }

  listTasks() {
    this.#tasks.forEach(task => print(task.toString()));
  }

  *prioritizedTasks() {
    const sortedTasks = [...this.#tasks].sort((a, b) => b.priority - a.priority);
    for (const task of sortedTasks) {
      yield task;
    }
  }
}

const taskManager = new TaskManager();
taskManager.addTask(new Task('Finish report', 2));
taskManager.addTask(new Task('Submit assignment', 1));
taskManager.addTask(new Task('Prepare presentation', 3));

print('All Tasks:');
taskManager.listTasks();

print('\nPrioritized Tasks:');
for (const task of taskManager.prioritizedTasks()) {
  print(task.toString());
}

taskManager.#tasks;  
