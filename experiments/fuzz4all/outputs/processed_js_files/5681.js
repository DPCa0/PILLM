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
    if (!this.events[event]) return;
    for (const listener of this.events[event]) {
      await listener(...args);
    }
  }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const emitter = new AsyncEventEmitter();

emitter.on('data', async (data) => {
  print('Listener 1 received:', data);
  await delay(1000);  
  print('Listener 1 done.');
});

emitter.on('data', async (data) => {
  print('Listener 2 received:', data);
  await delay(500);
  print('Listener 2 done.');
});

(async () => {
  print('Emitting event...');
  await emitter.emit('data', 'Complex Event Data');
  print('All listeners finished.');
})();
