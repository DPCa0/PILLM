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

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function* dataStream() {
  const data = [1, 2, 3, 4, 5];
  for (const item of data) {
    yield await delay(1000).then(() => item);
  }
}

(async () => {
  const eventEmitter = new EventEmitter();
  
  eventEmitter.on('data', data => {
    print(`Received data: ${data}`);
  });

  eventEmitter.on('done', () => {
    print('All data processed.');
  });

  for await (const data of dataStream()) {
    eventEmitter.emit('data', data);
  }

  eventEmitter.emit('done');
})();
