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
      this.events.get(event).forEach(listener => listener.apply(this, args));
    }
  }
}

function* idGenerator() {
  let id = 0;
  while (true) {
    yield id++;
  }
}

const asyncOperation = async (id) => {
  return new Promise(resolve => setTimeout(() => {
    resolve(`Operation ${id} complete.`);
  }, Math.random() * 2000));
};

const main = async () => {
  const emitter = new EventEmitter();
  const generateId = idGenerator();
  
  emitter.on('start', async (id) => {
    print(`Starting async operation ${id}...`);
    const result = await asyncOperation(id);
    emitter.emit('complete', result);
  });

  emitter.on('complete', (message) => {
    print(message);
    emitter.emit('start', generateId.next().value);
  });

  emitter.emit('start', generateId.next().value);
};

main();
