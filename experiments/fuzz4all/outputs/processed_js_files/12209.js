class Task {
  constructor(name) {
    this.name = name;
    this.completed = false;
  }

  complete() {
    this.completed = true;
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function executeTasks(tasks) {
  for await (const task of tasks) {
    print(`Starting: ${task.name}`);
    await delay(1000);  
    task.complete();
    print(`Completed: ${task.name}`);
  }
}

const tasks = [
  new Task('Task 1'),
  new Task('Task 2'),
  new Task('Task 3')
];

(async () => {
  await executeTasks(tasks);
  print('All tasks finished!');
})();
