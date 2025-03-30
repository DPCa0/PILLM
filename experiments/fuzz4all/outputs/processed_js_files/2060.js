class AsyncQueue {
  constructor() {
    this.queue = [];
    this.processing = false;
  }

  async processQueue() {
    if (this.processing) return;
    this.processing = true;
    
    while (this.queue.length) {
      const task = this.queue.shift();
      try {
        await task();
      } catch (error) {
        console.error("Task failed", error);
      }
    }
    
    this.processing = false;
  }

  enqueue(task) {
    this.queue.push(task);
    this.processQueue();
  }
}

const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  print(data);
};

const queue = new AsyncQueue();
const urls = [
  "https://jsonplaceholder.typicode.com/todos/1",
  "https://jsonplaceholder.typicode.com/todos/2",
  "https://jsonplaceholder.typicode.com/todos/3",
];

urls.forEach(url => {
  queue.enqueue(async () => {
    await fetchData(url);
    print(`Fetched from ${url}`);
  });
});

 
const handler = {
  get: (target, property) => {
    print(`Accessing ${property} property`);
    return target[property];
  },
  set: (target, property, value) => {
    print(`Setting ${property} property to ${value}`);
    target[property] = value;
    return true;
  }
};

const dataObj = new Proxy({ name: 'JavaScript', type: 'Programming Language' }, handler);

print(dataObj.name);
dataObj.type = "Scripting Language";

 
const tasks = {
  [Symbol.iterator]: function* () {
    yield 'task1';
    yield 'task2';
    yield 'task3';
  }
};

for (const task of tasks) {
  print('Processing:', task);
}
