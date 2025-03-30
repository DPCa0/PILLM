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

async function asyncProcess(data, emitter) {
  emitter.emit('start', data);

  for (let i = 0; i < data.length; i++) {
    await delay(500);
    emitter.emit('process', data[i]);
  }

  emitter.emit('end', data);
}

const emitter = new EventEmitter();

emitter.on('start', (data) => print(`Processing started for: ${data}`));
emitter.on('process', (item) => print(`Processing item: ${item}`));
emitter.on('end', (data) => print(`Processing ended for: ${data}`));

const data = ['apple', 'banana', 'cherry'];
asyncProcess(data, emitter);
