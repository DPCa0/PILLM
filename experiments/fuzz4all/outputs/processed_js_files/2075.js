class TaskQueue {
  constructor(concurrency) {
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
  }

  runTask(task) {
    return new Promise((resolve, reject) => {
      const attempt = async () => {
        if (this.running >= this.concurrency) {
          return this.queue.push(attempt);
        }
        this.running++;
        try {
          const result = await task();
          resolve(result);
        } catch (error) {
          reject(error);
        } finally {
          this.running--;
          if (this.queue.length) {
            const nextTask = this.queue.shift();
            nextTask();
          }
        }
      };
      attempt();
    });
  }
}

 
const createTask = (id, duration) => {
  return () =>
    new Promise((resolve) =>
      setTimeout(() => {
        print(`Task ${id} completed`);
        resolve(id);
      }, duration)
    );
};

 
(async () => {
  const queue = new TaskQueue(2);

  const tasks = [
    createTask(1, 3000),
    createTask(2, 2000),
    createTask(3, 1000),
    createTask(4, 4000),
    createTask(5, 500),
  ];

  const results = await Promise.all(tasks.map(task => queue.runTask(task)));
  print('All tasks completed:', results);
})();
