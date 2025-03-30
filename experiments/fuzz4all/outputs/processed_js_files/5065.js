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

async function* fibonacciGenerator(n) {
  let [a, b] = [0, 1];
  while (n-- > 0) {
    yield a;
    [a, b] = [b, a + b];
    await delay(100);  
  }
}

(async function() {
  const emitter = new EventEmitter();

  emitter.on('data', data => print('Received data:', data));
  emitter.on('complete', () => print('Sequence complete.'));

  const fibGen = fibonacciGenerator(10);

  for await (let value of fibGen) {
    emitter.emit('data', value);
  }

  emitter.emit('complete');
})();
