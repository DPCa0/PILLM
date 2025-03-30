class AsyncIterableQueue {
  constructor() {
    this.items = [];
    this.pendingResolves = [];
    this.closed = false;
  }

  push(item) {
    if (this.closed) throw new Error("Queue is closed");
    if (this.pendingResolves.length) {
      this.pendingResolves.shift()(item);
    } else {
      this.items.push(item);
    }
  }

  async *[Symbol.asyncIterator]() {
    while (true) {
      if (this.items.length) {
        yield this.items.shift();
      } else if (this.closed) {
        return;
      } else {
        yield await new Promise(resolve => this.pendingResolves.push(resolve));
      }
    }
  }

  close() {
    this.closed = true;
    while (this.pendingResolves.length) {
      this.pendingResolves.shift()(null);
    }
  }
}

async function* mergeAsyncIterables(...iterables) {
  const promises = iterables.map(it => it[Symbol.asyncIterator]().next());
  while (promises.length > 0) {
    const { index, value } = await Promise.race(promises.map((p, index) => p.then(value => ({ index, value }))));
    if (value.done) {
      promises.splice(index, 1);
    } else {
      promises[index] = iterables[index][Symbol.asyncIterator]().next();
      yield value.value;
    }
  }
}

(async () => {
  const queue1 = new AsyncIterableQueue();
  const queue2 = new AsyncIterableQueue();

  const producer1 = setInterval(() => queue1.push(Math.random()), 100);
  const producer2 = setInterval(() => queue2.push(Math.random()), 200);

  setTimeout(() => {
    clearInterval(producer1);
    queue1.close();
  }, 1000);

  setTimeout(() => {
    clearInterval(producer2);
    queue2.close();
  }, 2000);

  for await (const item of mergeAsyncIterables(queue1, queue2)) {
    print(item);
  }
})();
