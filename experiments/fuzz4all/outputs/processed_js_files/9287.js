class AsyncEventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(listener);
  }

  async emit(event, ...args) {
    if (this.events.has(event)) {
      const listeners = this.events.get(event);
      for (const listener of listeners) {
        await listener(...args);
      }
    }
  }

  off(event, listener) {
    if (this.events.has(event)) {
      const listeners = this.events.get(event);
      const index = listeners.indexOf(listener);
      if (index !== -1) {
        listeners.splice(index, 1);
      }
    }
  }
}

const asyncEmitter = new AsyncEventEmitter();

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

asyncEmitter.on('data', async (data) => {
  await delay(1000);
  print('Listener 1 received:', data);
});

asyncEmitter.on('data', async (data) => {
  await delay(500);
  print('Listener 2 received:', data);
});

(async () => {
  print('Emitting data event...');
  await asyncEmitter.emit('data', { payload: 42 });
  print('Data event processed.');
})();

const abortableAsyncOperation = async (signal) => {
  try {
    for (let i = 0; i < 5; i++) {
      if (signal.aborted) throw new Error('Operation aborted');
      await delay(500);
      print(`Step ${i + 1} completed`);
    }
  } catch (err) {
    print(err.message);
  }
};

const controller = new AbortController();
abortableAsyncOperation(controller.signal);

setTimeout(() => {
  print('Aborting operation...');
  controller.abort();
}, 1500);
