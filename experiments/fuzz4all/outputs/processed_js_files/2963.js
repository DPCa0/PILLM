class AsyncEventEmitter {
  constructor() {
    this.events = {};
  }

  async emit(event, ...args) {
    if (this.events[event]) {
      for (const listener of this.events[event]) {
        await listener(...args);
      }
    }
  }

  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
    return () => this.off(event, listener);
  }

  off(event, listener) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(l => l !== listener);
    }
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const emitter = new AsyncEventEmitter();

emitter.on('greet', async (name) => {
  await delay(1000);
  print(`Hello, ${name}!`);
});

emitter.on('greet', async (name) => {
  await delay(500);
  print(`Welcome, ${name}!`);
});

(async () => {
  print('Emitting event "greet"...');
  await emitter.emit('greet', 'Alice');
  print('All listeners for "greet" have finished.');
})();
