class AsyncQueue {
  constructor() {
    this.queue = [];
    this.isProcessing = false;
  }

  enqueue(promiseGenerator) {
    return new Promise((resolve, reject) => {
      this.queue.push({ promiseGenerator, resolve, reject });
      this.processQueue();
    });
  }

  async processQueue() {
    if (this.isProcessing || this.queue.length === 0) return;
    this.isProcessing = true;
    const { promiseGenerator, resolve, reject } = this.queue.shift();
    try {
      const result = await promiseGenerator();
      resolve(result);
    } catch (error) {
      reject(error);
    }
    this.isProcessing = false;
    this.processQueue();
  }
}

 
(async () => {
  const fetchSimulation = () => new Promise(resolve => setTimeout(() => resolve('Data fetched'), 1000));

  const queue = new AsyncQueue();

  const tasks = [
    () => queue.enqueue(() => fetchSimulation().then(result => `Task 1: ${result}`)),
    () => queue.enqueue(() => fetchSimulation().then(result => `Task 2: ${result}`)),
    () => queue.enqueue(() => fetchSimulation().then(result => `Task 3: ${result}`)),
  ];

  const results = await Promise.all(tasks.map(task => task()));
  print(results);  
})();
