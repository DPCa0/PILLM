class Task {
  constructor(name, duration) {
    this.name = name;
    this.duration = duration;
  }

  async execute() {
    print(`Starting task: ${this.name}`);
    return new Promise((resolve) => setTimeout(() => {
      print(`Completed task: ${this.name}`);
      resolve(this.name);
    }, this.duration));
  }
}

function* taskGenerator(tasks) {
  for (const task of tasks) {
    yield task.execute();
  }
}

async function executeTasks(taskList) {
  const generator = taskGenerator(taskList);
  for (let taskPromise of generator) {
    await taskPromise;
  }
}

const tasks = [
  new Task('Task 1', 1000),
  new Task('Task 2', 2000),
  new Task('Task 3', 1500),
];

(async () => {
  await executeTasks(tasks);
  print('All tasks completed!');
})();
