 

class TaskScheduler {
  constructor() {
    this.queue = [];
  }

  addTask(task) {
    this.queue.push(task);
  }

  async run() {
    while (this.queue.length) {
      const task = this.queue.shift();
      await task();
    }
  }
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const asyncTask = (name, duration) => async () => {
  print(`Starting task: ${name}`);
  await sleep(duration);
  print(`Completed task: ${name}`);
};

const main = async () => {
  const scheduler = new TaskScheduler();

  scheduler.addTask(asyncTask('Task 1', 1000));
  scheduler.addTask(asyncTask('Task 2', 500));
  scheduler.addTask(asyncTask('Task 3', 2000));

  print('Running task scheduler...');
  await scheduler.run();
  print('All tasks completed!');
};

main().catch(console.error);
