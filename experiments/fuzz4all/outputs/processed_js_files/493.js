class AsyncQueue {
  constructor() {
    this.queue = [];
    this.running = false;
  }

  enqueue(promiseFunction) {
    this.queue.push(promiseFunction);
    if (!this.running) this.runNext();
  }

  async runNext() {
    if (!this.queue.length) {
      this.running = false;
      return;
    }
    this.running = true;
    const currentPromiseFunction = this.queue.shift();
    try {
      await currentPromiseFunction();
    } catch (e) {
      console.error('Error processing queue:', e);
    }
    this.runNext();
  }
}

const asyncFetch = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  print(data);
};

const fetchQueue = new AsyncQueue();

['https://jsonplaceholder.typicode.com/todos/1', 
 'https://jsonplaceholder.typicode.com/todos/2',
 'https://jsonplaceholder.typicode.com/todos/3'].forEach(url => {
  fetchQueue.enqueue(() => asyncFetch(url));
});
