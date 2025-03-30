class Scheduler {
  constructor() {
    this.queue = [];
  }

  async executeTasks() {
    for (const task of this.queue) {
      await task();
    }
  }

  scheduleTask(fn, delay) {
    const task = async () => {
      await new Promise((resolve) => setTimeout(resolve, delay));
      await fn();
    };
    this.queue.push(task);
  }
}

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    print(`Fetched data from ${url}:`, data);
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
  }
};

const debouncedFunction = (fn, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

const logMessage = debouncedFunction((msg) => {
  print(msg);
}, 500);

const scheduler = new Scheduler();

scheduler.scheduleTask(() => fetchData('https://jsonplaceholder.typicode.com/posts/1'), 1000);
scheduler.scheduleTask(() => fetchData('https://jsonplaceholder.typicode.com/posts/2'), 2000);
scheduler.scheduleTask(() => logMessage('This message is logged with debounce'), 3000);

scheduler.executeTasks();
