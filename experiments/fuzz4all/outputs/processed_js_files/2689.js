class AsyncTaskQueue {
  constructor() {
    this.queue = [];
    this.isRunning = false;
  }

  async runNext() {
    if (this.isRunning || this.queue.length === 0) return;
    this.isRunning = true;
    const task = this.queue.shift();
    try {
      await task();
    } catch (error) {
      console.error('Task failed:', error);
    }
    this.isRunning = false;
    this.runNext();
  }

  addTask(task) {
    this.queue.push(task);
    this.runNext();
  }
}

const asyncTaskQueue = new AsyncTaskQueue();

 
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function createTask(name, time) {
  return async () => {
    print(`Starting ${name}`);
    await delay(time);
    print(`Finished ${name}`);
  };
}

asyncTaskQueue.addTask(createTask('Task 1', 1000));
asyncTaskQueue.addTask(createTask('Task 2', 500));
asyncTaskQueue.addTask(createTask('Task 3', 1500));

 
async function* numberGenerator() {
  let num = 0;
  while (num < 5) {
    yield num++;
    await delay(500);
  }
}

(async () => {
  for await (const number of numberGenerator()) {
    print(`Generated number: ${number}`);
  }
})();

 
const handler = {
  get(target, prop, receiver) {
    const origMethod = target[prop];
    return function (...args) {
      print(`Called ${prop} with arguments:`, args);
      return origMethod.apply(this, args);
    };
  }
};

const proxiedQueue = new Proxy(asyncTaskQueue, handler);
proxiedQueue.addTask(createTask('Task 4', 700));
