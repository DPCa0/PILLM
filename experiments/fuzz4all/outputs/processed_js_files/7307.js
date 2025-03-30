class AsyncWorker {
  constructor() {
    this.queue = [];
    this.isRunning = false;
  }

  async addTask(task) {
    return new Promise((resolve, reject) => {
      this.queue.push({ task, resolve, reject });
      this.run();
    });
  }

  async run() {
    if (this.isRunning || !this.queue.length) return;
    this.isRunning = true;

    const { task, resolve, reject } = this.queue.shift();

    try {
      const result = await task();
      resolve(result);
    } catch (error) {
      reject(error);
    } finally {
      this.isRunning = false;
      this.run();
    }
  }
}

const worker = new AsyncWorker();

const complexFunction = async () => {
  const result = await new Promise((resolve) => {
    setTimeout(() => {
      const data = { value: Math.random() * 100 };
      resolve(data);
    }, 1000);
  });

  return `Processed Value: ${(result.value * 2).toFixed(2)}`;
};

(async () => {
  try {
    const taskPromises = Array.from({ length: 5 }, () => worker.addTask(complexFunction));

    const results = await Promise.all(taskPromises);
    print('All Results:', results);
  } catch (error) {
    console.error('Error:', error);
  }
})();
