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

  off(event, listenerToRemove) {
    if (!this.events.has(event)) return;
    this.events.set(event, this.events.get(event).filter(listener => listener !== listenerToRemove));
  }
}

const asyncTimeout = ms => new Promise(resolve => setTimeout(resolve, ms));

async function* numberGenerator(limit) {
  for (let i = 0; i < limit; i++) {
    await asyncTimeout(100);
    yield i;
  }
}

const complexFunction = async () => {
  const emitter = new EventEmitter();
  
  emitter.on('data', data => {
    print(`Received: ${data}`);
  });

  emitter.on('complete', () => {
    print('Generator completed');
  });

  const generator = numberGenerator(5);

  for await (let number of generator) {
    emitter.emit('data', number);
  }
  
  emitter.emit('complete');
};

complexFunction();
