class Task {
  constructor(name, duration) {
    this.name = name;
    this.duration = duration;
  }

  async execute() {
    print(`Executing task: ${this.name}`);
    return new Promise(resolve => setTimeout(() => {
      print(`Completed task: ${this.name}`);
      resolve(this.name);
    }, this.duration));
  }
}

async function* taskGenerator(tasks) {
  for (const task of tasks) {
    yield await task.execute();
  }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const tasks = [
  new Task('Task 1', 1000),
  new Task('Task 2', 2000),
  new Task('Task 3', 1500),
];

const runTasks = async () => {
  print('Starting Task Execution:');
  const taskGen = taskGenerator(tasks);

  for await (const taskName of taskGen) {
    print(`Yielded task: ${taskName}`);
    await delay(500);  
  }

  print('All tasks have been executed.');
};

runTasks().catch(console.error);
