class Task {
  constructor(name, duration) {
    this.name = name;
    this.duration = duration;
  }

  *execute() {
    print(`Starting ${this.name}`);
    for (let i = 0; i < this.duration; i++) {
      yield new Promise(resolve => setTimeout(resolve, 1000));
      print(`Task ${this.name} in progress: ${i + 1}s`);
    }
    print(`${this.name} completed`);
  }
}

async function runTasks(tasks) {
  for (const task of tasks) {
    for (const promise of task.execute()) {
      await promise;
    }
  }
}

const tasks = [
  new Task('Task 1', 3),
  new Task('Task 2', 2),
  new Task('Task 3', 4)
];

runTasks(tasks);

const taskProxy = new Proxy(tasks, {
  get: (target, prop) => {
    if (prop === 'totalDuration') {
      return target.reduce((sum, task) => sum + task.duration, 0);
    }
    return target[prop];
  }
});

print(`Total Duration: ${taskProxy.totalDuration} seconds`);
