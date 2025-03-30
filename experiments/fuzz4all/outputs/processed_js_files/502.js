class Task {
  constructor(name) {
    this.name = name;
  }
  execute() {
    print(`Executing task: ${this.name}`);
  }
}

class ParallelExecutor {
  constructor(tasks) {
    this.tasks = tasks;
  }
  async run() {
    await Promise.all(this.tasks.map(task => task.execute()));
  }
}

class SequentialExecutor {
  constructor(tasks) {
    this.tasks = tasks;
  }
  async run() {
    for (const task of this.tasks) {
      await new Promise(resolve => setTimeout(() => {
        task.execute();
        resolve();
      }, Math.random() * 1000));
    }
  }
}

async function main() {
  const tasks = [
    new Task('Task 1'),
    new Task('Task 2'),
    new Task('Task 3'),
    new Task('Task 4')
  ];

  const parallelExecutor = new ParallelExecutor(tasks);
  print('Running tasks in parallel:');
  await parallelExecutor.run();

  const sequentialExecutor = new SequentialExecutor(tasks);
  print('Running tasks sequentially:');
  await sequentialExecutor.run();
}

main().catch(console.error);
