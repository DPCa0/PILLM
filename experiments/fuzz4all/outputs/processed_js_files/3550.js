class AsyncEventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(listener);
    return this;
  }

  emit(event, ...args) {
    if (!this.events.has(event)) return false;
    const listeners = this.events.get(event).slice();
    listeners.forEach(listener => {
      Promise.resolve().then(() => listener(...args));
    });
    return true;
  }
}

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

const emitter = new AsyncEventEmitter();

async function asyncFunction() {
  print('Start processing...');
  await wait(1000);
  emitter.emit('done', 'Data processed!');
}

emitter.on('done', async message => {
  print(message);
  await wait(500);
  print('Finished after event.');
});

asyncFunction();
print('Async operation initiated...');
