class AsyncIterableQueue {
  constructor() {
    this._queue = [];
    this._resolvers = [];
  }

  enqueue(item) {
    if (this._resolvers.length) {
      const resolver = this._resolvers.shift();
      resolver({ value: item, done: false });
    } else {
      this._queue.push(item);
    }
  }

  async *[Symbol.asyncIterator]() {
    while (true) {
      if (this._queue.length) {
        yield { value: this._queue.shift(), done: false };
      } else {
        yield await new Promise(resolve => this._resolvers.push(resolve));
      }
    }
  }

  close() {
    for (const resolve of this._resolvers) {
      resolve({ value: undefined, done: true });
    }
    this._resolvers = [];
  }
}

const asyncProcess = async (iterable) => {
  for await (const item of iterable) {
    print(`Processing: ${item}`);
    await new Promise(resolve => setTimeout(resolve, 1000));  
  }
};

const runProgram = async () => {
  const queue = new AsyncIterableQueue();

   
  asyncProcess(queue);

   
  ['Apple', 'Banana', 'Cherry'].forEach((item, index) => {
    setTimeout(() => queue.enqueue(item), index * 500);
  });

   
  setTimeout(() => queue.close(), 2500);
};

runProgram();
