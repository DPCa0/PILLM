class AsyncQueue {
  constructor() {
    this.queue = [];
    this.processing = false;
  }

  async enqueue(promiseFn) {
    return new Promise((resolve, reject) => {
      this.queue.push({ promiseFn, resolve, reject });
      this.processQueue();
    });
  }

  async processQueue() {
    if (this.processing || !this.queue.length) return;
    this.processing = true;
    const { promiseFn, resolve, reject } = this.queue.shift();
    
    try {
      const result = await promiseFn();
      resolve(result);
    } catch (error) {
      reject(error);
    } finally {
      this.processing = false;
      this.processQueue();
    }
  }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const main = async () => {
  const queue = new AsyncQueue();
  
  const tasks = Array.from({ length: 5 }, (_, i) => async () => {
    await delay(1000);
    print(`Task ${i + 1} done!`);
    return i + 1;
  });

  const results = await Promise.all(tasks.map(task => queue.enqueue(task)));
  print('All tasks completed:', results);
};

main();
