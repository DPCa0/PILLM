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
  for (const task of tasks) {
    yield task.execute();
  }
}

const tasks = [
  new Task('Task 1', 1000),
  new Task('Task 2', 2000),
  new Task('Task 3', 1500)
];

const taskGen = taskGenerator(tasks);

(async () => {
  for (let task of taskGen) {
    await task;
  }
  print('All tasks completed.');
})();

const proxyTasks = new Proxy(tasks, {
  get(target, prop, receiver) {
    if (prop === 'length') {
      print(`Accessing length: ${target.length}`);
    }
    return Reflect.get(...arguments);
  }
});

print(`Number of tasks: ${proxyTasks.length}`);
