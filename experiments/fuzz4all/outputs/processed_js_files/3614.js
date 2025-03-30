class AsyncQueue {
  constructor() {
    this.queue = [];
    this.running = false;
  }

  async enqueue(task) {
    this.queue.push(task);
    if (!this.running) {
      this.running = true;
      while (this.queue.length) {
        const currentTask = this.queue.shift();
        await currentTask();
      }
      this.running = false;
    }
  }
}

const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch data from ${url}`);
  const data = await response.json();
  print(`Data from ${url}:`, data);
};

const asyncQueue = new AsyncQueue();

 
const urls = [
  'https://api.mocki.io/v1/ce5f60e2',
  'https://api.mocki.io/v1/b043df5a',
  'https://api.mocki.io/v1/1fbb6d83'
];

urls.forEach(url => {
  asyncQueue.enqueue(() => fetchData(url));
});

const main = async () => {
  const delayedPromise = () => new Promise(resolve => setTimeout(() => resolve('Task Completed'), 2000));

  print('Starting delayed task');
  const result = await asyncQueue.enqueue(() => delayedPromise());
  print(result);
};

main();
