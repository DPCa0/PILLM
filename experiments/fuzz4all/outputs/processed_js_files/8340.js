class Task {
  constructor(name, duration) {
    this.name = name;
    this.duration = duration;
  }
  
  async execute() {
    print(`Starting task: ${this.name}`);
    await new Promise(resolve => setTimeout(resolve, this.duration));
    print(`Finished task: ${this.name}`);
  }
}

function* taskGenerator() {
  yield new Task('Task 1', 1000);
  yield new Task('Task 2', 2000);
  yield new Task('Task 3', 1500);
}

async function executeTasksConcurrently(maxConcurrentTasks) {
  const tasks = [...taskGenerator()];
  const activeTasks = [];

  while (tasks.length > 0 || activeTasks.length > 0) {
    while (activeTasks.length < maxConcurrentTasks && tasks.length > 0) {
      const task = tasks.shift();
      const taskPromise = task.execute().then(() => {
        activeTasks.splice(activeTasks.indexOf(taskPromise), 1);
      });
      activeTasks.push(taskPromise);
    }

    await Promise.race(activeTasks);
  }
}

(async () => {
  print("Starting concurrent task execution:");
  await executeTasksConcurrently(2);
  print("All tasks completed.");
})();
