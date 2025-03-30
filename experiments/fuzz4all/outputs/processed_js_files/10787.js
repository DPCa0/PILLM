class Task {
  constructor(name, duration) {
    this.name = name;
    this.duration = duration;
  }
}

class Scheduler {
  constructor() {
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push(task);
  }

  async executeTasks() {
    const results = await Promise.allSettled(
      this.tasks.map(task => this.#executeTask(task))
    );
    results.forEach(result => {
      if (result.status === 'fulfilled') {
        print(result.value);
      } else {
        console.error(result.reason);
      }
    });
  }

  async #executeTask(task) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.2) {
          resolve(`Completed: ${task.name}`);
        } else {
          reject(`Failed: ${task.name}`);
        }
      }, task.duration);
    });
  }
}

const task1 = new Task('Read', 1000);
const task2 = new Task('Write', 1500);
const task3 = new Task('Code', 500);

const scheduler = new Scheduler();
scheduler.addTask(task1);
scheduler.addTask(task2);
scheduler.addTask(task3);

scheduler.executeTasks();
