class AsyncExecutor {
  constructor(tasks) {
    this.tasks = tasks;
  }

  async execute() {
    let results = [];
    for (let task of this.tasks) {
      results.push(await task());
    }
    return results;
  }
}

const task1 = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return 'Task 1 completed';
};

const task2 = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return 'Task 2 completed';
};

const task3 = async () => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return 'Task 3 completed';
};

 
const logger = {
  get: (target, property) => {
    print(`Accessed property: ${property}`);
    return target[property];
  }
};

const executorProxy = new Proxy(new AsyncExecutor([task1, task2, task3]), logger);

(async () => {
  const results = await executorProxy.execute();
  print(results);
})();
