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
  }

  off(event, listenerToRemove) {
    if (!this.events.has(event)) return;
    const listeners = this.events.get(event);
    this.events.set(event, listeners.filter(listener => listener !== listenerToRemove));
  }
}

 
const asyncEmitter = new AsyncEventEmitter();

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
asyncEmitter.on('data', async (data) => {
  await delay(1000);  
  print(`Processed data: ${data}`);
});

 
(async () => {
  print('Emitting event...');
  await asyncEmitter.emit('data', 'Hello, world!');
  print('Event processing complete.');
})();
