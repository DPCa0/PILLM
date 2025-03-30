class Task {
  #description;
  constructor(title, description) {
    this.title = title;
    this.#description = description;
    this.isComplete = false;
  }
  
  markComplete() {
    this.isComplete = true;
  }
  
  getDetails() {
    return `${this.title}: ${this.#description} [${this.isComplete ? 'Complete' : 'Incomplete'}]`;
  }
}

const asyncTimeout = async (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const taskList = new Proxy([], {
  get(target, property) {
    if (property === 'last') {
      return target[target.length - 1];
    }
    return target[property];
  },
  set(target, property, value) {
    if (typeof value !== 'object' || !(value instanceof Task)) {
      throw new TypeError('Only Task objects can be added to the task list');
    }
    target[property] = value;
    return true;
  }
});

(async () => {
  const task1 = new Task('Task 1', 'Learn advanced JavaScript');
  const task2 = new Task('Task 2', 'Build a small project');
  
  taskList.push(task1);
  taskList.push(task2);
  
  print('Task List:', taskList.map(task => task.getDetails()));
  
  print('\nMarking the last task as complete after 2 seconds...');
  await asyncTimeout(2000);
  taskList.last.markComplete();
  
  print('Task List after completing the last task:', taskList.map(task => task.getDetails()));
})();
