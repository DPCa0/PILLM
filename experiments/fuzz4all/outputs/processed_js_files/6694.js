class Task {
  constructor(title, deadline) {
    this.title = title;
    this.deadline = new Date(deadline);
    this.completed = false;
  }

  markCompleted() {
    this.completed = true;
    print(`${this.title} has been completed.`);
  }

  get isOverdue() {
    return new Date() > this.deadline && !this.completed;
  }

  toString() {
    return `${this.title} - Deadline: ${this.deadline.toLocaleDateString()} - ${this.completed ? 'Completed' : 'Pending'}`;
  }
}

const taskManager = {
  tasks: new Set(),

  addTask(title, deadline) {
    const task = new Task(title, deadline);
    this.tasks.add(task);
    return task;
  },

  completeTask(task) {
    if (this.tasks.has(task)) {
      task.markCompleted();
    } else {
      print('Task not found in manager.');
    }
  },

  get overdueTasks() {
    return [...this.tasks].filter(task => task.isOverdue);
  },

  [Symbol.iterator]: function* () {
    for (const task of this.tasks) {
      yield task;
    }
  }
};

const task1 = taskManager.addTask('Finish project report', '2023-10-10');
const task2 = taskManager.addTask('Plan team meeting', '2023-10-08');
const task3 = taskManager.addTask('Buy groceries', '2023-10-05');

taskManager.completeTask(task2);

print('All Tasks:');
for (const task of taskManager) {
  print(task.toString());
}

print('\nOverdue Tasks:');
taskManager.overdueTasks.forEach(task => print(task.toString()));
