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

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function* fibonacciGenerator(limit) {
  let [a, b] = [0, 1];
  while (limit-- > 0) {
    await delay(500);
    [a, b] = [b, a + b];
    yield a;
  }
}

(async () => {
  const emitter = new EventEmitter();
  
  emitter.on('data', data => print(`Fibonacci: ${data}`));
  emitter.on('complete', () => print('Sequence complete.'));

  for await (let num of fibonacciGenerator(10)) {
    emitter.emit('data', num);
  }
  
  emitter.emit('complete');
})();
