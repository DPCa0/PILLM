class Task {
  constructor(name, duration) {
    this.name = name;
    this.duration = duration;
  }

  async execute() {
    print(`Starting ${this.name}`);
    await new Promise((resolve) => setTimeout(resolve, this.duration));
    print(`${this.name} completed`);
  }
}

const tasks = [
  new Task('Task 1', 1000),
  new Task('Task 2', 500),
  new Task('Task 3', 2000),
];

async function executeTasksInParallel(tasks) {
  await Promise.all(tasks.map(task => task.execute()));
}

function* taskGenerator() {
  yield* tasks;
}

async function executeTasksSequentially(generator) {
  for (let task of generator) {
    await task.execute();
  }
}

const executeTasks = async (mode) => {
  if (mode === 'parallel') {
    print('Executing tasks in parallel');
    await executeTasksInParallel(tasks);
  } else if (mode === 'sequential') {
    print('Executing tasks sequentially');
    const generator = taskGenerator();
    await executeTasksSequentially(generator);
  } else {
    console.error('Unknown execution mode');
  }
};

executeTasks('parallel')
  .then(() => executeTasks('sequential'))
  .catch(console.error);
