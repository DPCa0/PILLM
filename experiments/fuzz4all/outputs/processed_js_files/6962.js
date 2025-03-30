class AsyncQueue {
  constructor() {
    this.tasks = [];
    this.isProcessing = false;
  }

  enqueue(task) {
    this.tasks.push(task);
    if (!this.isProcessing) {
      this.processQueue();
    }
  }

  async processQueue() {
    this.isProcessing = true;
    while (this.tasks.length > 0) {
      const task = this.tasks.shift();
      await task();
    }
    this.isProcessing = false;
  }
}

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

async function task(id, time) {
  print(`Task ${id} started`);
  await delay(time);
  print(`Task ${id} completed`);
}

const queue = new AsyncQueue();

queue.enqueue(() => task(1, 1000));
queue.enqueue(() => task(2, 500));
queue.enqueue(() => task(3, 2000));

 
async function* taskGenerator() {
  yield task(4, 1500);
  yield task(5, 800);
}

(async () => {
  for await (let t of taskGenerator()) {
    queue.enqueue(() => t);
  }
})();

 
const handler = {
  get: (target, prop, receiver) => {
    print(`Property ${prop} has been accessed`);
    return Reflect.get(target, prop, receiver);
  }
};

const proxiedQueue = new Proxy(queue, handler);

proxiedQueue.enqueue(() => task(6, 1200));
