class AsyncScheduler {
  constructor(tasks) {
    this.tasks = tasks;
  }

  async *taskGenerator() {
    for (const task of this.tasks) {
      yield await task();
    }
  }

  async execute() {
    const results = [];
    for await (const result of this.taskGenerator()) {
      results.push(result);
    }
    return results;
  }
}

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const tasks = [
  async () => {
    await delay(1000);
    return "Task 1 complete";
  },
  async () => {
    await delay(500);
    return "Task 2 complete";
  },
  async () => {
    await delay(300);
    return "Task 3 complete";
  }
];

(async () => {
  const scheduler = new AsyncScheduler(tasks);

  const results = await scheduler.execute();
  results.forEach((result) => print(result));

   
  const handler = {
    get(target, prop) {
      print(`Accessing property '${prop}'`);
      return Reflect.get(...arguments);
    }
  };

  const loggedScheduler = new Proxy(scheduler, handler);
  print(await loggedScheduler.execute());
})();
