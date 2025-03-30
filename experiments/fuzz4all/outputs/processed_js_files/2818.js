class AsyncQueue {
  constructor() {
    this.tasks = [];
    this.isRunning = false;
  }

  async runTask(task) {
    await task();
    this.isRunning = false;
    this.next();
  }

  enqueue(task) {
    this.tasks.push(task);
    if (!this.isRunning) {
      this.isRunning = true;
      this.next();
    }
  }

  next() {
    if (this.tasks.length > 0) {
      const task = this.tasks.shift();
      this.runTask(task);
    }
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network error');
  const data = await response.json();
  print(`Fetched data from ${url}:`, data);
}

const queue = new AsyncQueue();

queue.enqueue(async () => {
  await delay(1000);
  await fetchData('https://jsonplaceholder.typicode.com/posts/1');
});

queue.enqueue(async () => {
  await delay(500);
  await fetchData('https://jsonplaceholder.typicode.com/posts/2');
});

queue.enqueue(async () => {
  await delay(100);
  await fetchData('https://jsonplaceholder.typicode.com/posts/3');
});

queue.enqueue(async () => {
  await fetchData('https://jsonplaceholder.typicode.com/posts/4');
});
