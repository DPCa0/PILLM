class AsyncIterableQueue {
  constructor() {
    this.queue = [];
    this.resolveNext = null;
  }
  
  enqueue(value) {
    if (this.resolveNext) {
      this.resolveNext({ value, done: false });
      this.resolveNext = null;
    } else {
      this.queue.push(value);
    }
  }

  [Symbol.asyncIterator]() {
    return {
      next: () => {
        if (this.queue.length) {
          return Promise.resolve({ value: this.queue.shift(), done: false });
        } else {
          return new Promise(resolve => this.resolveNext = resolve);
        }
      }
    };
  }
}

async function* fetchData(urls) {
  for (const url of urls) {
    yield fetch(url)
      .then(response => response.json())
      .then(data => ({ url, data }))
      .catch(error => ({ url, error }));
  }
}

(async () => {
  const urls = ['https://api.github.com/users/github', 'https://api.github.com/users/microsoft'];
  const asyncQueue = new AsyncIterableQueue();

  for await (const result of fetchData(urls)) {
    asyncQueue.enqueue(result);
  }

  const printData = async () => {
    for await (const { url, data, error } of asyncQueue) {
      if (error) {
        console.error(`Error fetching from ${url}:`, error);
      } else {
        print(`Data from ${url}:`, data);
      }
    }
  };

  printData();
})();
