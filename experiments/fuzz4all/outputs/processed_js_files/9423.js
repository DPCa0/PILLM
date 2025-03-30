class AsyncManager {
  constructor() {
    this.queue = [];
  }

  async processQueue() {
    while (this.queue.length > 0) {
      const task = this.queue.shift();
      await task();
    }
  }

  addTask(task) {
    this.queue.push(task);
    if (this.queue.length === 1) {
      this.processQueue();
    }
  }
}

const fetchData = async (url) => {
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    let data = await response.json();
    print(data);
  } catch (error) {
    console.error(`Failed to fetch ${url}: `, error);
  }
};

const urls = [
  'https://jsonplaceholder.typicode.com/posts/1',
  'https://jsonplaceholder.typicode.com/posts/2',
  'https://jsonplaceholder.typicode.com/posts/3'
];

const manager = new AsyncManager();

urls.forEach(url => {
  manager.addTask(() => fetchData(url));
});
