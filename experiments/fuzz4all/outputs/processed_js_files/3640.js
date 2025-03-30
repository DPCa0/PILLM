class AsyncQueue {
  constructor() {
    this.queue = [];
    this.isProcessing = false;
  }

  async enqueue(task) {
    this.queue.push(task);
    if (!this.isProcessing) {
      await this.processQueue();
    }
  }

  async processQueue() {
    this.isProcessing = true;
    while (this.queue.length > 0) {
      const task = this.queue.shift();
      try {
        const result = await task();
        print('Task completed with result:', result);
      } catch (error) {
        console.error('Task failed with error:', error);
      }
    }
    this.isProcessing = false;
  }
}

const apiCall = (url) => fetch(url).then((response) => response.json());

(async () => {
  const queue = new AsyncQueue();

  const task1 = () => apiCall('https://jsonplaceholder.typicode.com/posts/1');
  const task2 = () => apiCall('https://jsonplaceholder.typicode.com/posts/2');
  const task3 = () => apiCall('https://jsonplaceholder.typicode.com/posts/3');

  await queue.enqueue(task1);
  await queue.enqueue(task2);
  await queue.enqueue(task3);
})();
