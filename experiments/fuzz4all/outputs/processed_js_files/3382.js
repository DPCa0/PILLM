class AsyncIterableQueue {
  constructor() {
    this.queue = [];
    this.isDraining = false;
    this.resolveNext;
    this.nextPromise = new Promise(resolve => (this.resolveNext = resolve));
  }

  enqueue(item) {
    this.queue.push(item);
    if (!this.isDraining) {
      this._drainQueue();
    }
  }

  async _drainQueue() {
    this.isDraining = true;
    while (this.queue.length > 0) {
      const current = this.queue.shift();
      await new Promise(res => setTimeout(res, 100));  
      this.resolveNext(current);
      this.nextPromise = new Promise(resolve => (this.resolveNext = resolve));
    }
    this.isDraining = false;
  }

  [Symbol.asyncIterator]() {
    return {
      next: async () => {
        if (this.queue.length === 0 && !this.isDraining) {
          return { done: true };
        }
        const value = await this.nextPromise;
        return { value, done: false };
      }
    };
  }
}

 
(async () => {
  const queue = new AsyncIterableQueue();
  
  queue.enqueue('First');
  queue.enqueue('Second');
  queue.enqueue('Third');

  for await (const item of queue) {
    print('Processing:', item);
  }

  queue.enqueue('Fourth');
  queue.enqueue('Fifth');

  for await (const item of queue) {
    print('Processing:', item);
  }
})();
