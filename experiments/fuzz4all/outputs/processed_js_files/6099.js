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
}

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  const emitter = new AsyncEventEmitter();
  
  emitter.on('greet', async name => {
    await delay(1000);
    print(`Hello, ${name}!`);
  });
  
  emitter.on('greet', async name => {
    await delay(500);
    print(`${name}, nice to meet you!`);
  });
  
  print('Greeting...');
  await emitter.emit('greet', 'Alice');
  print('Done!');
}

main();
