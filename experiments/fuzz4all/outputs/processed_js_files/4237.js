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

const asyncGeneratorExample = async function* () {
  for (let i = 0; i < 5; i++) {
    await delay(1000);
    yield i;
  }
};

(async () => {
  const emitter = new EventEmitter();

  emitter.on('data', data => print(`Received data: ${data}`));
  emitter.on('done', () => print('Processing complete'));

  for await (const value of asyncGeneratorExample()) {
    emitter.emit('data', value);
  }
  
  emitter.emit('done');
})();
