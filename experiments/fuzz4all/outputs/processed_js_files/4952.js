 

class EventEmitter {
  constructor() {
    this.events = {};
  }
  
  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }
  
  emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach(listener => listener(...args));
    }
  }
}

const asyncIterable = {
  data: ['event1', 'event2', 'event3'],
  async *[Symbol.asyncIterator]() {
    for (const item of this.data) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      yield item;
    }
  }
};

(async () => {
  const emitter = new EventEmitter();
  
  emitter.on('event1', message => print(`Handling ${message}`));
  emitter.on('event2', message => print(`Processing ${message}`));
  emitter.on('event3', message => print(`Finalizing ${message}`));
  
  for await (const event of asyncIterable) {
    emitter.emit(event, `message for ${event}`);
  }
})();
