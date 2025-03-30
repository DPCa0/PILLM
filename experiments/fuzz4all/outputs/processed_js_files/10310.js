class Task {
  constructor(title, dueDate) {
    this.title = title;
    this.dueDate = dueDate;
    this.isComplete = false;
  }
  complete() {
    this.isComplete = true;
  }
  toString() {
    return `${this.title} - Due: ${this.dueDate.toLocaleDateString()} - ${this.isComplete ? 'Completed' : 'Pending'}`;
  }
}

class TaskList {
  #tasks = new Set();

  addTask(task) {
    if (task instanceof Task) {
      this.#tasks.add(task);
    } else {
      throw new Error('Only Task instances can be added.');
    }
  }

  get pendingTasks() {
    return [...this.#tasks].filter(task => !task.isComplete);
  }

  *[Symbol.iterator]() {
    yield* this.#tasks;
  }
}

const asyncFetchTaskDetails = async (taskId) => {
  const taskDetails = await new Promise((resolve) => {
    setTimeout(() => resolve({ title: `Task ${taskId}`, dueDate: new Date() }), 1000);
  });
  return new Task(taskDetails.title, taskDetails.dueDate);
};

(async () => {
  const taskList = new TaskList();

  const taskIds = [1, 2, 3];
  const taskPromises = taskIds.map(asyncFetchTaskDetails);
  const tasks = await Promise.all(taskPromises);

  tasks.forEach(task => taskList.addTask(task));

  for (const task of taskList) {
    print(task.toString());
  }

  print('Completing first task...');
  taskList.pendingTasks[0].complete();

  print('Updated Task List:');
  for (const task of taskList) {
    print(task.toString());
  }
})();
