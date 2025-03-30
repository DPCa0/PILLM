class AsyncQueue {
  constructor() {
    this.tasks = [];
    this.running = false;
  }

  async processQueue() {
    if (this.running) return;
    this.running = true;
    while (this.tasks.length > 0) {
      const task = this.tasks.shift();
      await task();
    }
    this.running = false;
  }

  addTask(task) {
    this.tasks.push(task);
    this.processQueue();
  }
}

 
function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

const expensiveCalculation = memoize((num) => {
  print(`Calculating for ${num}...`);
  let result = 0;
  for (let i = 0; i < 1e6; i++) {
    result += num * Math.random();
  }
  return result;
});

const queue = new AsyncQueue();

 
async function performTask(num) {
  const result = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(expensiveCalculation(num));
    }, 1000);
  });
  print(`Result for ${num}:`, result);
}

[10, 20, 10, 30, 20].forEach((num) => queue.addTask(() => performTask(num)));
