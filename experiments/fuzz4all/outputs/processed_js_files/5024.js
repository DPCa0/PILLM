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

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function* asyncGenerator(array) {
  for (const item of array) {
    await sleep(100);
    yield item;
  }
}

(async () => {
  const emitter = new EventEmitter();
  const items = ['foo', 'bar', 'baz'];
  const asyncGen = asyncGenerator(items);

  emitter.on('data', data => print(`Received: ${data}`));
  emitter.on('end', () => print('Done receiving data'));

  for await (const item of asyncGen) {
    emitter.emit('data', item);
  }
  emitter.emit('end');
})();
