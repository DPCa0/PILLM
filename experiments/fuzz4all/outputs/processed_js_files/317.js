class AsyncEventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  async emit(event, ...args) {
    if (this.events[event]) {
      const promises = this.events[event].map((listener) => listener(...args));
      await Promise.all(promises);
    }
  }
}

const eventEmitter = new AsyncEventEmitter();

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

eventEmitter.on('data', async (data) => {
  await delay(1000);
  print('Listener 1 received data:', data);
});

eventEmitter.on('data', async (data) => {
  await delay(500);
  print('Listener 2 received data:', data);
});

(async () => {
  print('Emitting event...');
  await eventEmitter.emit('data', { message: 'Hello, world!' });
  print('All listeners have finished processing.');
})();
