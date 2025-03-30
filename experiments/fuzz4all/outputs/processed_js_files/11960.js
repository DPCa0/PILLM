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
      this.events.get(event).forEach(listener => listener(...args));
    }
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function* asyncRange(start, end, step = 1) {
  for (let i = start; i < end; i += step) {
    await delay(100);
    yield i;
  }
}

const eventEmitter = new EventEmitter();
eventEmitter.on('data', data => print(`Received: ${data}`));
eventEmitter.on('done', () => print('Done processing.'));

(async () => {
  for await (const value of asyncRange(0, 5)) {
    eventEmitter.emit('data', value);
  }
  eventEmitter.emit('done');
})();
