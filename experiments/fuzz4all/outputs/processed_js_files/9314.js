class AsyncQueue {
  constructor() {
    this.queue = [];
    this.isProcessing = false;
  }

  async processQueue() {
    if (this.isProcessing) return;
    this.isProcessing = true;

    while (this.queue.length) {
      const task = this.queue.shift();
      await task();
    }

    this.isProcessing = false;
  }

  addTask(task) {
    this.queue.push(task);
    this.processQueue();
  }
}

const fetchJson = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
};

const queue = new AsyncQueue();

 
const urls = [
  'https://jsonplaceholder.typicode.com/posts/1',
  'https://jsonplaceholder.typicode.com/posts/2',
  'https://jsonplaceholder.typicode.com/posts/3',
];

urls.forEach((url, index) => {
  queue.addTask(async () => {
    try {
      print(`Fetching URL ${index + 1}`);
      const data = await fetchJson(url);
      print(`Data from URL ${index + 1}:`, data);
    } catch (error) {
      console.error(`Error fetching URL ${index + 1}:`, error);
    }
  });
});
