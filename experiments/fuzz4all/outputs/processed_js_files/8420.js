class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }
    this.events.get(event).add(listener);
  }

  off(event, listener) {
    if (this.events.has(event)) {
      this.events.get(event).delete(listener);
    }
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

async function asyncOperation() {
  print("Starting async operation...");
  await delay(1000);
  print("Async operation completed.");
}

function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const emitter = new EventEmitter();
const generator = idGenerator();

emitter.on('data', async data => {
  print(`Received data: ${data}`);
  await asyncOperation();
});

emitter.on('data', data => {
  const id = generator.next().value;
  print(`Processing data with ID: ${id}`);
});

const dataItems = ['Item1', 'Item2', 'Item3'];

dataItems.forEach(item => emitter.emit('data', item));
