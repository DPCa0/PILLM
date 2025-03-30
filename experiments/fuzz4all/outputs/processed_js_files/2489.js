class AsyncQueue {
  constructor() {
    this.queue = [];
    this.isProcessing = false;
  }
  
  async enqueue(task) {
    this.queue.push(task);
    if (!this.isProcessing) {
      this.processQueue();
    }
  }
  
  async processQueue() {
    this.isProcessing = true;
    while (this.queue.length > 0) {
      const task = this.queue.shift();
      await task();
    }
    this.isProcessing = false;
  }
}

async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  print('Data:', data);
}

const tasks = [
  () => fetchData('https://jsonplaceholder.typicode.com/todos/1'),
  () => fetchData('https://jsonplaceholder.typicode.com/todos/2'),
  () => fetchData('https://jsonplaceholder.typicode.com/todos/3')
];

const queue = new AsyncQueue();

for (const task of tasks) {
  queue.enqueue(task);
}

 
const arrayHandler = {
  get: function(target, property) {
    print(`Getting the property "${property}"`);
    return target[property];
  },
  set: function(target, property, value) {
    print(`Setting the property "${property}" to "${value}"`);
    target[property] = value;
    return true;
  }
};

const proxiedArray = new Proxy([], arrayHandler);
proxiedArray.push(1);
proxiedArray.push(2);
print(proxiedArray[1]);

 
const uniqueKey1 = Symbol('key');
const uniqueKey2 = Symbol('key');

const obj = {
  [uniqueKey1]: 'Value for key 1',
  [uniqueKey2]: 'Value for key 2'
};

print(obj[uniqueKey1]);
print(obj[uniqueKey2]);

 
function* fibonacci(n) {
  let [prev, curr] = [0, 1];
  for (let i = 0; i < n; i++) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

const fibSequence = fibonacci(5);
for (const num of fibSequence) {
  print(num);
}
