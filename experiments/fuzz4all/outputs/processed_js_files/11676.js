class Task {
  constructor(name, duration) {
    this.name = name;
    this.duration = duration;
  }
  
  async execute() {
    print(`Starting task: ${this.name}`);
    await new Promise(resolve => setTimeout(resolve, this.duration));
    print(`Completed task: ${this.name}`);
  }
}

function* taskGenerator(tasks) {
  for (let task of tasks) {
    yield task.execute();
  }
}

const tasks = [
  new Task("Task 1", 1000),
  new Task("Task 2", 2000),
  new Task("Task 3", 1500)
];

(async function executeTasks() {
  const generator = taskGenerator(tasks);

  for (let task of generator) {
    await task;
  }
  
  print('All tasks completed!');
})();
