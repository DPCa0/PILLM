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

const asyncProcess = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Process ${id} completed`), Math.random() * 2000);
  });
}

(async function() {
  const emitter = new EventEmitter();
  const results = new Set();

  emitter.on('processCompleted', (result) => {
    results.add(result);
    if (results.size === 3) {
      print('All processes completed:', Array.from(results));
    }
  });

  for (let i = 1; i <= 3; i++) {
    asyncProcess(i).then((result) => {
      print(result);
      emitter.emit('processCompleted', result);
    });
  }
})();
