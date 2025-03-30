class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (!this.events.has(event)) this.events.set(event, []);
    this.events.get(event).push(listener);
  }

  emit(event, ...args) {
    if (!this.events.has(event)) return;
    this.events.get(event).forEach(listener => listener(...args));
  }
}

async function* generateNumbers(limit) {
  for (let i = 1; i <= limit; i++) {
    yield new Promise(resolve => setTimeout(() => resolve(i), 100));
  }
}

const eventEmitter = new EventEmitter();

eventEmitter.on('numberGenerated', num => {
  print(`Generated number: ${num}`);
});

(async function() {
  for await (const number of generateNumbers(5)) {
    eventEmitter.emit('numberGenerated', number);
  }
})();
