class AsyncEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(listener);
    return () => this.off(event, listener);
  }

  off(event, listener) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(l => l !== listener);
  }

  async emit(event, ...args) {
    if (!this.events[event]) return;
    const promises = this.events[event].map(listener => listener(...args));
    await Promise.all(promises);
  }
}

const emitter = new AsyncEmitter();

emitter.on('greet', async name => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  print(`Hello, ${name}!`);
});

emitter.on('greet', async name => {
  await new Promise(resolve => setTimeout(resolve, 500));
  print(`How are you, ${name}?`);
});

(async function() {
  print('Emitting events...');
  await emitter.emit('greet', 'world');
  print('Done emitting events.');
})();
