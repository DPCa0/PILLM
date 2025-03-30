class AsyncQueue {
  constructor() {
    this.queue = [];
    this.processing = false;
  }

  enqueue(promiseFunc) {
    this.queue.push(promiseFunc);
    this.processQueue();
  }

  async processQueue() {
    if (this.processing) return;
    this.processing = true;
    while (this.queue.length > 0) {
      const current = this.queue.shift();
      try {
        const result = await current();
        print('Processed:', result);
      } catch (error) {
        console.error('Error:', error);
      }
    }
    this.processing = false;
  }
}

const queue = new AsyncQueue();

 
function createAsyncTask(name, delay) {
  return () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.8) reject(`Failed: ${name}`);
        else resolve(`Completed: ${name}`);
      }, delay);
    });
}

queue.enqueue(createAsyncTask('Task 1', 1000));
queue.enqueue(createAsyncTask('Task 2', 500));
queue.enqueue(createAsyncTask('Task 3', 700));
queue.enqueue(createAsyncTask('Task 4', 300));
queue.enqueue(createAsyncTask('Task 5', 800));
