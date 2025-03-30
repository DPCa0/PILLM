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

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const asyncRange = async function* (start, end, step = 1) {
  for (let i = start; i <= end; i += step) {
    await delay(100);  
    yield i;
  }
};

(async () => {
  const emitter = new EventEmitter();
  emitter.on('data', data => print('Data:', data));
  emitter.on('complete', () => print('Completed!'));

  for await (const num of asyncRange(1, 5)) {
    emitter.emit('data', num);
  }
  emitter.emit('complete');
})();
