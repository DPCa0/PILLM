class AsyncQueue {
  constructor() {
    this.queue = [];
    this.processing = false;
  }

  async addTask(task) {
    this.queue.push(task);
    if (!this.processing) {
      this.processTasks();
    }
  }

  async processTasks() {
    this.processing = true;
    while (this.queue.length > 0) {
      const task = this.queue.shift();
      await task();
    }
    this.processing = false;
  }
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchData = async () => {
  await delay(1000);
  print('Data fetched');
};

const processData = async () => {
  await delay(2000);
  print('Data processed');
};

const displayData = async () => {
  await delay(500);
  print('Data displayed');
};

const asyncQueue = new AsyncQueue();
asyncQueue.addTask(fetchData);
asyncQueue.addTask(processData);
asyncQueue.addTask(displayData);
