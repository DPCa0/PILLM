class Task {
  constructor(name, duration) {
    this.name = name;
    this.duration = duration;
  }

  getDescription() {
    return `${this.name} will take ${this.duration} hours.`;
  }
}

class AsyncTask extends Task {
  async execute() {
    print(`Starting task: ${this.name}`);
    return new Promise(resolve => {
      setTimeout(() => {
        print(`Completed task: ${this.name}`);
        resolve(this.duration);
      }, this.duration * 1000);
    });
  }
}

function* taskGenerator(tasks) {
  for (let task of tasks) {
    yield task.execute();
  }
}

async function runTasksConcurrently(tasks) {
  const taskPromises = [...taskGenerator(tasks)];
  const durations = await Promise.all(taskPromises);
  print(`Total time taken: ${durations.reduce((a, b) => a + b, 0)} hours`);
}

const tasks = [
  new AsyncTask('Task 1', 1),
  new AsyncTask('Task 2', 2),
  new AsyncTask('Task 3', 3)
];

runTasksConcurrently(tasks);
