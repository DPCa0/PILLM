class AsyncEmitter {
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
}

const asyncEvent = new AsyncEmitter();

asyncEvent.on('data', async (data) => {
  await new Promise(res => setTimeout(res, 1000));  
  print('Listener 1:', data);
});

asyncEvent.on('data', async (data) => {
  await new Promise(res => setTimeout(res, 500));  
  print('Listener 2:', data);
});

(async () => {
  print('Start Emitting');
  await asyncEvent.emit('data', { key: 'value' });
  print('Emission Complete');
})();
