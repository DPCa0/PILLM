class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(listener);
  }

  emit(event, ...args) {
    if (this.events.has(event)) {
      for (const listener of this.events.get(event)) {
        listener(...args);
      }
    }
  }

  off(event, listenerToRemove) {
    if (this.events.has(event)) {
      this.events.set(event, this.events.get(event).filter(listener => listener !== listenerToRemove));
    }
  }
}

const delayedTask = ms => new Promise(resolve => setTimeout(resolve, ms));

async function* asyncGenerator(max) {
  for (let i = 0; i < max; i++) {
    await delayedTask(1000);
    yield i;
  }
}

(async function main() {
  const emitter = new EventEmitter();

  const listener = data => print(`Received: ${data}`);
  emitter.on('data', listener);

  const generator = asyncGenerator(5);
  for await (const value of generator) {
    emitter.emit('data', value);
  }

  emitter.off('data', listener);
  print('Finished!');
})();
