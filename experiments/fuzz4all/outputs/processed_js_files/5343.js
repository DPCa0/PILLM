 

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

const asyncOperation = async (delay) => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};

(async () => {
  const emitter = new EventEmitter();
  
  emitter.on('start', async () => {
    print('Starting complex process...');
    await asyncOperation(1000);
    print('Process underway...');
  });

  emitter.on('complete', () => {
    print('Complex process complete!');
  });

  const executeComplexProcess = async function* () {
    yield emitter.emit('start');
    await asyncOperation(2000);
    yield emitter.emit('complete');
  };

  for await (let _ of executeComplexProcess()) {   }
})();
