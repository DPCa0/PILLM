 
class Task {
  constructor(name, duration) {
    this.name = name;
    this.duration = duration;
  }

   
  execute() {
    return new Promise((resolve) => {
      setTimeout(() => {
        print(`Task ${this.name} completed.`);
        resolve(this.name);
      }, this.duration);
    });
  }
}

 
async function runTasksConcurrently(tasks, limit) {
  const results = [];
  const executing = new Set();

  for (const task of tasks) {
    const p = task.execute().then((result) => {
      executing.delete(p);
      return result;
    });
    results.push(p);
    executing.add(p);

    if (executing.size >= limit) {
      await Promise.race(executing);
    }
  }
  return Promise.all(results);
}

 
(async () => {
  const tasks = [
    new Task('A', 3000),
    new Task('B', 2000),
    new Task('C', 4000),
    new Task('D', 1000),
    new Task('E', 5000),
  ];

  print('Starting tasks with concurrency limit of 2...');
  const taskResults = await runTasksConcurrently(tasks, 2);
  print('All tasks completed:', taskResults);
})();
