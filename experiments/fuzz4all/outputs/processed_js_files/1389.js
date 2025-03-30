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
    if (!this.events.has(event)) return;
    const listeners = this.events.get(event);
    await Promise.all(listeners.map(listener => listener(...args)));
  }
}

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const emitter = new AsyncEventEmitter();

emitter.on('greet', async name => {
  await delay(1000);
  print(`Hello, ${name}!`);
});

emitter.on('greet', async name => {
  await delay(500);
  print(`How are you, ${name}?`);
});

(async () => {
  await emitter.emit('greet', 'Alice');
  print('All greetings done!');
})();
