class Task {
  constructor(name) {
    this.name = name;
    this.isCompleted = false;
  }

  toggleStatus() {
    this.isCompleted = !this.isCompleted;
  }
}

function* idGenerator() {
  let id = 0;
  while (true) {
    yield id++;
  }
}

const taskIdGenerator = idGenerator();

const taskHandler = {
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    } else {
      print(`Property "${prop}" doesn't exist on task object.`);
      return null;
    }
  },
  set(target, prop, value) {
    if (prop === 'name' && typeof value === 'string') {
      target[prop] = value;
      return true;
    } else if (prop === 'isCompleted' && typeof value === 'boolean') {
      target[prop] = value;
      return true;
    } else {
      throw new Error(`Invalid value or property assignment: ${prop}`);
    }
  }
};

class TaskManager {
  #tasks = new Map();

  addTask(task) {
    const id = taskIdGenerator.next().value;
    this.#tasks.set(id, new Proxy(task, taskHandler));
  }

  completeTask(id) {
    const task = this.#tasks.get(id);
    if (task) {
      task.toggleStatus();
    } else {
      print(`No task found with id: ${id}`);
    }
  }

  listTasks() {
    this.#tasks.forEach((task, id) => {
      print(`Task ID: ${id}, Name: ${task.name}, Completed: ${task.isCompleted}`);
    });
  }
}

const taskManager = new TaskManager();
taskManager.addTask(new Task('Learn JavaScript'));
taskManager.addTask(new Task('Master ES6 features'));
taskManager.completeTask(0);
taskManager.listTasks();
