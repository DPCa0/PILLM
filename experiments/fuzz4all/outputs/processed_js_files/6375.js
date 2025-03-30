class AsyncQueue {
  constructor() {
    this.queue = [];
    this.isProcessing = false;
  }

  async enqueue(promise) {
    this.queue.push(promise);
    if (!this.isProcessing) {
      this.isProcessing = true;
      await this._processQueue();
    }
  }

  async _processQueue() {
    while (this.queue.length > 0) {
      const currentTask = this.queue.shift();
      try {
        const result = await currentTask();
        print('Task completed with result:', result);
      } catch (error) {
        console.error('Task failed with error:', error);
      }
    }
    this.isProcessing = false;
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  const queue = new AsyncQueue();

  const task1 = async () => {
    await delay(1000);
    return 'Task 1 result';
  };

  const task2 = async () => {
    await delay(500);
    throw new Error('Task 2 error');
  };

  const task3 = async () => {
    await delay(2000);
    return 'Task 3 result';
  };

  await Promise.all([
    queue.enqueue(task1),
    queue.enqueue(task2),
    queue.enqueue(task3),
  ]);
}

main();
