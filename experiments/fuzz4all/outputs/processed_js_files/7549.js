class AsyncEventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(listener);
  }

  off(event, listenerToRemove) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(listener => listener !== listenerToRemove);
  }

  async emit(event, ...args) {
    if (!this.events[event]) return;
    const promises = this.events[event].map(listener => listener(...args));
    await Promise.all(promises);
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const emitter = new AsyncEventEmitter();

emitter.on('data', async (name) => {
  await delay(1000);
  print(`Hello, ${name}! This message was delayed.`);
});

emitter.on('data', async (name) => {
  print(`Second listener also greets you, ${name}!`);
});

(async () => {
  await emitter.emit('data', 'World');
  print('All listeners have completed.');
})();
