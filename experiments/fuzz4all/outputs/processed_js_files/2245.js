class AsyncIterableQueue {
  constructor() {
    this.queue = [];
    this.resolvers = [];
  }

  enqueue(item) {
    if (this.resolvers.length) {
      const resolver = this.resolvers.shift();
      resolver({ done: false, value: item });
    } else {
      this.queue.push(item);
    }
  }

  [Symbol.asyncIterator]() {
    return {
      next: () => {
        if (this.queue.length) {
          return Promise.resolve({ done: false, value: this.queue.shift() });
        }
        return new Promise(resolve => this.resolvers.push(resolve));
      }
    };
  }
}

async function* generateAsyncNumbers(limit) {
  for (let i = 0; i <= limit; i++) {
    yield new Promise(resolve => setTimeout(() => resolve(i), 100));
  }
}

async function main() {
  const queue = new AsyncIterableQueue();
  const asyncNumbers = generateAsyncNumbers(5);

  (async () => {
    for await (const number of asyncNumbers) {
      queue.enqueue(number);
    }
  })();

  for await (const item of queue) {
    print(`Async Item: ${item}`);
    if (item === 5) break;  
  }
}

main().catch(console.error);
