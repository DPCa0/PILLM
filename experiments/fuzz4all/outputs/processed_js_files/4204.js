class AsyncQueue {
  constructor() {
    this.queue = [];
    this.processing = false;
  }

  async enqueue(task) {
    this.queue.push(task);
    if (!this.processing) {
      this.processing = true;
      while (this.queue.length) {
        const currentTask = this.queue.shift();
        await currentTask();
      }
      this.processing = false;
    }
  }
}

const apiCall = (url) => new Promise((resolve) => {
  setTimeout(() => {
    print(`Fetched data from ${url}`);
    resolve(`Data from ${url}`);
  }, Math.random() * 2000);
});

(async () => {
  const queue = new AsyncQueue();
  
  const urls = [
    'https://api.example.com/data1',
    'https://api.example.com/data2',
    'https://api.example.com/data3',
  ];

  const fetchTasks = urls.map(url => async () => {
    const data = await apiCall(url);
    print(data);
  });

  fetchTasks.forEach(task => queue.enqueue(task));
})();
