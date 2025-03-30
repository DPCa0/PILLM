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
    if (!this.events.has(event)) return;
    const promises = this.events.get(event).map(listener => listener(...args));
    await Promise.all(promises);
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const asyncEmitter = new AsyncEmitter();

asyncEmitter.on('greet', async (name) => {
  await delay(1000);
  print(`Hello, ${name}!`);
});

asyncEmitter.on('greet', async (name) => {
  await delay(500);
  print(`Welcome, ${name}!`);
});

(async () => {
  print('Greeting...');
  await asyncEmitter.emit('greet', 'Alice');
  print('Greeting completed.');
})();
