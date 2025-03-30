class Scheduler {
  #tasks = new Map();

  addTask(name, taskFunc, interval) {
    if (this.#tasks.has(name)) throw new Error('Task already exists');
    const taskWrapper = async () => {
      await taskFunc();
      this.#tasks.set(name, setTimeout(taskWrapper, interval));
    };
    this.#tasks.set(name, setTimeout(taskWrapper, interval));
  }

  removeTask(name) {
    if (!this.#tasks.has(name)) throw new Error('Task not found');
    clearTimeout(this.#tasks.get(name));
    this.#tasks.delete(name);
  }

  async executeConcurrently(promises, limit = 2) {
    const results = [];
    const executing = new Set();

    for (const promise of promises) {
      const p = Promise.resolve().then(() => promise);
      results.push(p);

      if (limit <= promises.length) {
        const e = p.then(() => executing.delete(e));
        executing.add(e);

        if (executing.size >= limit) {
          await Promise.race(executing);
        }
      }
    }

    return Promise.all(results);
  }
}

async function asyncOperation(id) {
  return new Promise(resolve => {
    setTimeout(() => {
      print(`Operation ${id} completed`);
      resolve(id);
    }, Math.random() * 1000);
  });
}

(async function () {
  const scheduler = new Scheduler();

  scheduler.addTask('logTime', () => {
    print('Current Time:', new Date().toLocaleTimeString());
  }, 3000);

  const asyncTasks = Array.from({ length: 5 }, (_, i) => asyncOperation(i + 1));
  const results = await scheduler.executeConcurrently(asyncTasks, 2);

  print('All results:', results);

  setTimeout(() => scheduler.removeTask('logTime'), 10000);
})();
