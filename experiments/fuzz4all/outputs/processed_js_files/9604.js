class AsyncEventEmitter {
  constructor() {
    this.events = new Map();
  }

  async emit(event, ...args) {
    if (this.events.has(event)) {
      for (const listener of this.events.get(event)) {
        await listener(...args);
      }
    }
  }

  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(listener);
    return this;
  }

  off(event, listener) {
    if (this.events.has(event)) {
      const idx = this.events.get(event).indexOf(listener);
      if (idx !== -1) this.events.get(event).splice(idx, 1);
    }
    return this;
  }
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const asyncEE = new AsyncEventEmitter();

asyncEE.on('data', async (msg) => {
  await delay(500);
  print(`Received: ${msg}`);
});

(async function () {
  print('Starting...');
  await asyncEE.emit('data', 'Hello, Async World!');
  print('Completed.');
})();
