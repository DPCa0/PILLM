class AsyncQueue {
  constructor() {
    this.queue = [];
    this.pendingPromise = false;
  }

  enqueue(task) {
    return new Promise((resolve, reject) => {
      this.queue.push({ task, resolve, reject });
      this.dequeue();
    });
  }

  dequeue() {
    if (!this.pendingPromise && this.queue.length) {
      const { task, resolve, reject } = this.queue.shift();
      this.pendingPromise = true;
      Promise.resolve(task())
        .then(resolve)
        .catch(reject)
        .finally(() => {
          this.pendingPromise = false;
          this.dequeue();
        });
    }
  }
}

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
}

const queue = new AsyncQueue();

 
const dataHandler = {
  set(target, property, value) {
    if (typeof value !== 'string') {
      throw new TypeError('Value must be a string');
    }
    target[property] = value;
    return true;
  }
};

const dataStore = new Proxy({}, dataHandler);

const urls = ['https://jsonplaceholder.typicode.com/posts/1', 'https://jsonplaceholder.typicode.com/posts/2'];

urls.forEach(url => {
  queue.enqueue(() => fetchData(url))
    .then(data => {
      dataStore[`post${data.id}`] = JSON.stringify(data);
      print(`Fetched: ${dataStore[`post${data.id}`]}`);
    })
    .catch(err => console.error('Fetch error:', err));
});
