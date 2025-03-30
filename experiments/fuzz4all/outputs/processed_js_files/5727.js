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

(async () => {
   
  print('Starting...');

   
  const emitter = new EventEmitter();

  emitter.on('tick', async (iteration) => {
    print(`Tick ${iteration}`);
    if (iteration < 5) {
      await delay(500);
      emitter.emit('tick', iteration + 1);
    } else {
      print('Finished');
    }
  });

   
  (function generateTicks() {
    emitter.emit('tick', 0);
  })();
})();
