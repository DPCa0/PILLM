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

const asyncIterable = {
  [Symbol.asyncIterator]: asyncGenerator
};

async function run() {
  const emitter = new EventEmitter();
  emitter.on('data', data => print(`Received: ${data}`));

  for await (const num of asyncIterable) {
    emitter.emit('data', num);
  }

  print('Finished processing data');
}

run();
