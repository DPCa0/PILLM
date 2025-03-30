class AsyncQueue {
  constructor() {
    this.queue = [];
    this.executing = false;
  }

  async execute(task) {
    this.queue.push(task);
    if (!this.executing) {
      this.executing = true;
      while (this.queue.length) {
        const currentTask = this.queue.shift();
        await currentTask();
      }
      this.executing = false;
    }
  }
}

 
const simulateRequest = (id, delay) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      print(`Task ${id} completed`);
      resolve();
    }, delay)
  );
};

 
async function task1() {
  await simulateRequest(1, 1000);
}

async function task2() {
  await simulateRequest(2, 500);
}

async function task3() {
  await simulateRequest(3, 1500);
}

const queue = new AsyncQueue();

 
queue.execute(task1);
queue.execute(task2);
queue.execute(task3);

 
(async () => {
  await Promise.all([
    (async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      print("Parallel Task A completed");
    })(),
    (async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      print("Parallel Task B completed");
    })(),
  ]);
})();
