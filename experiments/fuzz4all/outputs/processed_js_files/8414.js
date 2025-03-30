class AsyncIterableQueue {
  constructor() {
    this.queue = [];
    this.resolveQueue = [];
  }

  enqueue(item) {
    if (this.resolveQueue.length > 0) {
      const resolve = this.resolveQueue.shift();
      resolve({ value: item, done: false });
    } else {
      this.queue.push(item);
    }
  }

  [Symbol.asyncIterator]() {
    return {
      next: () => {
        if (this.queue.length > 0) {
          return Promise.resolve({ value: this.queue.shift(), done: false });
        }
        return new Promise(resolve => {
          this.resolveQueue.push(resolve);
        });
      }
    };
  }
}

async function* dataFetcher(urls) {
  for (const url of urls) {
    yield fetch(url).then(response => response.json());
  }
}

(async function complexFlow() {
  const queue = new AsyncIterableQueue();
  const urls = ['https://jsonplaceholder.typicode.com/posts/1', 
                'https://jsonplaceholder.typicode.com/posts/2'];

  const producer = (async () => {
    for await (const data of dataFetcher(urls)) {
      queue.enqueue(data);
    }
  })();

  const consumer = (async () => {
    for await (const data of queue) {
      print('Received data:', data);
    }
  })();

  await Promise.all([producer, consumer]);
})();
