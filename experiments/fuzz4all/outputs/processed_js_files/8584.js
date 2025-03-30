class AsyncQueue {
  constructor() {
    this.queue = [];
    this.isProcessing = false;
  }

  enqueue(promiseFunc) {
    this.queue.push(promiseFunc);
    this.processQueue();
  }

  async processQueue() {
    if (this.isProcessing || this.queue.length === 0) return;
    this.isProcessing = true;

    while (this.queue.length > 0) {
      const promiseFunc = this.queue.shift();
      try {
        const result = await promiseFunc();
        print('Result:', result);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    this.isProcessing = false;
  }
}

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

const urls = [
  'https://jsonplaceholder.typicode.com/posts/1',
  'https://jsonplaceholder.typicode.com/posts/2',
  'https://jsonplaceholder.typicode.com/posts/3',
];

const queue = new AsyncQueue();

urls.forEach(url => queue.enqueue(() => fetchData(url)));

 
const handler = {
  get(target, prop, receiver) {
    print(`Getting ${prop}`);
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    print(`Setting ${prop} to ${value}`);
    return Reflect.set(target, prop, value, receiver);
  }
};

const reactiveObject = new Proxy({ message: 'Hello' }, handler);
reactiveObject.message = 'Hello, world!';
print(reactiveObject.message);
