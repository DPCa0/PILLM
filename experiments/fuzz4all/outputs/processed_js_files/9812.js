class Task {
  constructor(title, dueDate) {
    this.title = title;
    this.dueDate = dueDate;
    this.isCompleted = false;
  }

  complete() {
    this.isCompleted = true;
  }

  toString() {
    return `${this.title} [Due: ${this.dueDate.toLocaleDateString()}] - ${this.isCompleted ? 'Completed' : 'Pending'}`;
  }
}

class TaskList {
  #tasks = new Set();

  addTask(task) {
    if (task instanceof Task) {
      this.#tasks.add(task);
    } else {
      throw new Error('Only instances of Task can be added.');
    }
  }

  completeTask(title) {
    const task = [...this.#tasks].find(task => task.title === title);
    if (task) task.complete();
  }

  *[Symbol.iterator]() {
    yield* Array.from(this.#tasks).sort((a, b) => a.dueDate - b.dueDate);
  }
}

const dateOffset = offset => {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return date;
};

const myTasks = new TaskList();
myTasks.addTask(new Task("Finish report", dateOffset(3)));
myTasks.addTask(new Task("Buy groceries", dateOffset(1)));
myTasks.addTask(new Task("Pay bills", dateOffset(5)));

myTasks.completeTask("Buy groceries");

print([...myTasks].map(task => task.toString()).join('\n'));
