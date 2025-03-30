class AsyncQueue {
  constructor() {
    this.queue = [];
    this.pendingPromise = false;
  }

  enqueue(promiseFn) {
    this.queue.push(promiseFn);
    if (!this.pendingPromise) {
      this.dequeue();
    }
  }

  async dequeue() {
    if (this.queue.length === 0) {
      this.pendingPromise = false;
      return;
    }
    this.pendingPromise = true;
    const promiseFn = this.queue.shift();
    await promiseFn();
    this.dequeue();
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchData(url) {
  print(`Fetching ${url}...`);
  await delay(1000);  
  print(`Data fetched from ${url}`);
}

const urls = [
  'https://api.example.com/data1',
  'https://api.example.com/data2',
  'https://api.example.com/data3'
];

const queue = new AsyncQueue();

urls.forEach(url => {
  queue.enqueue(async () => {
    await fetchData(url);
  });
});

 
const target = {
  data: 42,
  method() {
    return this.data;
  }
};

const handler = {
  get(target, property, receiver) {
    print(`Property '${property}' was accessed.`);
    return Reflect.get(...arguments);
  }
};

const proxy = new Proxy(target, handler);

print(proxy.method());
