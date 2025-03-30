class EventEmitter {
  constructor() {
    this.events = new Map();
  }
  
  on(event, listener) {
    if (!this.events.has(event)) this.events.set(event, []);
    this.events.get(event).push(listener);
  }
  
  emit(event, ...args) {
    if (this.events.has(event)) {
      this.events.get(event).forEach(listener => listener(...args));
    }
  }
}

const eventEmitter = new EventEmitter();

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const asyncIterable = {
  [Symbol.asyncIterator]: async function* () {
    for (let i = 0; i < 5; i++) {
      await delay(1000);
      yield i;
    }
  }
};

(async () => {
  eventEmitter.on('tick', (tick) => {
    print(`Tick: ${tick}`);
  });

  for await (const num of asyncIterable) {
    eventEmitter.emit('tick', num);
  }

  print('Iteration completed.');
})();
