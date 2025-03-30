 

 
const TASK_SYMBOL = Symbol('task');

 
const taskLogger = (task) => new Proxy(task, {
  get(target, property) {
    print(`Accessing property "${property}"`);
    return target[property];
  },
  set(target, property, value) {
    print(`Setting property "${property}" to "${value}"`);
    target[property] = value;
    return true;
  }
});

 
function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const generateId = idGenerator();

 
class TaskManager {
  constructor() {
    this.tasks = {};
  }

  async addTask(description) {
    const id = generateId.next().value;
    const task = {
      id,
      description,
      completed: false,
      [TASK_SYMBOL]: true
    };
    this.tasks[id] = taskLogger(task);
    return new Promise((resolve) => setTimeout(() => resolve(task), 1000));
  }

  async completeTask(id) {
    if (this.tasks[id]) {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.tasks[id].completed = true;
          resolve(this.tasks[id]);
        }, 1000);
      });
    } else {
      throw new Error('Task not found');
    }
  }

  listTasks() {
    return Object.values(this.tasks);
  }
}

(async () => {
  const manager = new TaskManager();
  const task1 = await manager.addTask('Learn advanced JavaScript');
  print('Added task:', task1);

  const task2 = await manager.addTask('Build a complex application');
  print('Added task:', task2);

  await manager.completeTask(task1.id);
  print('Completed task:', manager.tasks[task1.id]);

  print('Current tasks:', manager.listTasks());
})();
