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
    const filteredListeners = this.events
      .get(event)
      .filter(listener => listener !== listenerToRemove);
    this.events.set(event, filteredListeners);
  }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function* asyncCounter(start, end) {
  for (let i = start; i <= end; i++) {
    await delay(100);
    yield i;
  }
}

(async () => {
  const eventEmitter = new EventEmitter();

  eventEmitter.on('tick', (count) => {
    print(`Count is: ${count}`);
  });

  const counter = asyncCounter(1, 5);

  for await (const count of counter) {
    eventEmitter.emit('tick', count);
  }

  eventEmitter.off('tick', console.log);

  eventEmitter.emit('tick', "This should not log");
})();
