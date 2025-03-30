class TaskScheduler {
  constructor() {
    this.taskQueue = [];
    this.running = false;
  }

  async addTask(task) {
    this.taskQueue.push(task);
    if (!this.running) {
      this.running = true;
      while (this.taskQueue.length) {
        const currentTask = this.taskQueue.shift();
        await currentTask();
      }
      this.running = false;
    }
  }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function* fibonacci() {
  let [prev, curr] = [0, 1];
  for (;;) {
    [prev, curr] = [curr, prev + curr];
    yield curr;
  }
}

(async () => {
  const scheduler = new TaskScheduler();
  const fibGen = fibonacci();

  const tasks = Array.from({ length: 5 }, (_, i) => async () => {
    const fibNum = fibGen.next().value;
    await delay(1000);
    print(`Task ${i + 1}: Fibonacci number is ${fibNum}`);
  });

  tasks.forEach(task => scheduler.addTask(task));
})();
