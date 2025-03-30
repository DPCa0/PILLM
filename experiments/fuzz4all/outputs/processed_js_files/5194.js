Certainly! Here's a JavaScript program that uses advanced features like async/await, Promises, destructuring, spread/rest operators, and classes:

class Task {
  constructor(id, description) {
    this.id = id;
    this.description = description;
  }
  logTask() {
    print(`Task [${this.id}]: ${this.description}`);
  }
}

class TaskManager {
  constructor() {
    this.tasks = new Map();
  }

  addTask(task) {
    if (this.tasks.has(task.id)) {
      throw new Error(`Task with ID ${task.id} already exists`);
    }
    this.tasks.set(task.id, task);
  }

  getTask(id) {
    return this.tasks.get(id);
  }

  listTasks() {
    [...this.tasks.values()].forEach(task => task.logTask());
  }
}

const fetchTaskData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([{ id: 1, description: 'Learn JavaScript' }, { id: 2, description: 'Write advanced JS code' }]);
    }, 1000);
  });
};

const main = async () => {
  const taskManager = new TaskManager();
  try {
    const tasksData = await fetchTaskData();

    for (const taskData of tasksData) {
      const { id, description } = taskData;
      const task = new Task(id, description);
      taskManager.addTask(task);
    }
    
    print('Current Tasks:');
    taskManager.listTasks();
  } catch (error) {
    console.error('Error:', error.message);
  }
};

main();

This program includes a `Task` class for managing individual tasks and a `TaskManager` class for managing a collection of tasks. It demonstrates the use of JavaScript's modern features to asynchronously fetch data, manage tasks, and log them to the console.