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

async function* asyncGenerator() {
  let i = 0;
  while (i < 3) {
    yield new Promise(resolve => setTimeout(() => resolve(i++), 1000));
  }
}

const eventEmitter = new EventEmitter();

eventEmitter.on('data', data => {
  print(`Data received: ${data}`);
});

eventEmitter.on('end', () => {
  print('No more data.');
});

(async () => {
  for await (const data of asyncGenerator()) {
    eventEmitter.emit('data', data);
  }
  eventEmitter.emit('end');
})();
