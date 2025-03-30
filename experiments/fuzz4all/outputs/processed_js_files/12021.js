class AsyncQueue {
  constructor() {
    this.tasks = [];
    this.isProcessing = false;
  }

  async enqueue(task) {
    this.tasks.push(task);
    if (!this.isProcessing) {
      this.isProcessing = true;
      while (this.tasks.length) {
        const currentTask = this.tasks.shift();
        await currentTask();
      }
      this.isProcessing = false;
    }
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const mockData = { data: `Data from ${url}` };
      resolve(mockData);
    }, Math.random() * 1000);
  });
}

const urls = ['https://api.example.com/1', 'https://api.example.com/2', 'https://api.example.com/3'];
const results = new Map();
const queue = new AsyncQueue();

urls.forEach(url => {
  queue.enqueue(async () => {
    try {
      const data = await fetchData(url);
      results.set(url, data);
      print(`Fetched data for ${url}:`, data);
    } catch (error) {
      console.error(`Error fetching data for ${url}:`, error);
    }
  });
});

 
const resultsProxy = new Proxy(results, {
  get(target, prop) {
    print(`Accessing property "${prop}"`);
    return Reflect.get(target, prop);
  },
  set(target, prop, value) {
    print(`Setting property "${prop}" to`, value);
    return Reflect.set(target, prop, value);
  }
});

 
setTimeout(() => {
  print('Results:', Array.from(resultsProxy.entries()));
}, 1500);
