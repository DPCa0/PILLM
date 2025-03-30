class AsyncQueue {
  constructor() {
    this.queue = [];
    this.isProcessing = false;
  }

  async enqueue(task) {
    this.queue.push(task);
    if (!this.isProcessing) {
      this.isProcessing = true;
      while (this.queue.length > 0) {
        const currentTask = this.queue.shift();
        await currentTask();
      }
      this.isProcessing = false;
    }
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const taskRunner = new AsyncQueue();

async function fetchData(url) {
  print(`Fetching data from ${url}...`);
  await delay(1000);  
  print(`Data from ${url} received.`);
}

async function* dataGenerator() {
  const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
  for (const url of urls) {
    yield () => taskRunner.enqueue(() => fetchData(url));
  }
}

(async () => {
  const generator = dataGenerator();
  for await (const task of generator) {
    task();
  }
})();
