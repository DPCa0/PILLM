class AsyncQueue {
  constructor() {
    this.queue = [];
    this.running = false;
  }

  enqueue(task) {
    this.queue.push(task);
    this.runNext();
  }

  async runNext() {
    if (this.running || this.queue.length === 0) return;
    this.running = true;
    const task = this.queue.shift();
    await task();
    this.running = false;
    this.runNext();
  }
}

const delayedLog = (message, delay) => () =>
  new Promise((resolve) =>
    setTimeout(() => {
      print(message);
      resolve();
    }, delay)
  );

const queue = new AsyncQueue();
queue.enqueue(delayedLog("Message 1", 1000));
queue.enqueue(delayedLog("Message 2", 500));
queue.enqueue(delayedLog("Message 3", 2000));

 
const concurrentTasks = async () => {
  const task1 = delayedLog("Concurrent 1", 1500)();
  const task2 = delayedLog("Concurrent 2", 1000)();
  await Promise.all([task1, task2]);
  print("Both concurrent tasks finished");
};

concurrentTasks();

 
async function* taskGenerator() {
  let count = 4;
  while (count <= 6) {
    yield delayedLog(`Generated Message ${count}`, 1200);
    count++;
  }
}

const generator = taskGenerator();
(async () => {
  for await (let task of generator) {
    queue.enqueue(task);
  }
})();
