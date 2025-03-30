class AsyncQueue {
  constructor() {
    this.queue = [];
    this.running = false;
  }

  async processQueue() {
    if (this.running || !this.queue.length) return;
    this.running = true;

    const { fn, resolve, reject } = this.queue.shift();
    try {
      const result = await fn();
      resolve(result);
    } catch (error) {
      reject(error);
    } finally {
      this.running = false;
      this.processQueue();
    }
  }

  enqueue(fn) {
    return new Promise((resolve, reject) => {
      this.queue.push({ fn, resolve, reject });
      this.processQueue();
    });
  }
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const queue = new AsyncQueue();
  
  const tasks = [1, 2, 3, 4, 5].map((num) => {
    return queue.enqueue(async () => {
      await delay(1000);
      print(`Task ${num} done`);
    });
  });
  
  await Promise.all(tasks);
  print('All tasks completed');
}

main();
