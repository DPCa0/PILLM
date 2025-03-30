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

const asyncGenerator = async function* (start, end) {
  for (let i = start; i <= end; i++) {
    await delay(100);
    yield i;
  }
};

(async () => {
  const emitter = new EventEmitter();

  emitter.on('number', num => {
    if (num % 2 === 0) {
      print(`Even number: ${num}`);
    } else {
      print(`Odd number: ${num}`);
    }
  });

  emitter.on('complete', () => print('Counting complete.'));

  for await (let num of asyncGenerator(1, 10)) {
    emitter.emit('number', num);
  }

  emitter.emit('complete');
})();
