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
    const listeners = this.events.get(event);
    if (listeners) {
      listeners.forEach(listener => listener(...args));
    }
  }
}

const asyncOperation = async () => {
  return new Promise(resolve => {
    setTimeout(() => resolve('Data loaded'), 1000);
  });
};

const doSomething = async () => {
  const data = await asyncOperation();
  return `Result: ${data}`;
};

(async () => {
  const emitter = new EventEmitter();
  
  emitter.on('data', async (data) => {
    print(`Listener 1 received: ${data}`);
    if (data === 'Data loaded') {
      let result = await doSomething();
      print(result);
    }
  });

  emitter.on('data', (data) => {
    print(`Listener 2 received: ${data}`);
  });

  let data = await asyncOperation();
  emitter.emit('data', data);
})();
