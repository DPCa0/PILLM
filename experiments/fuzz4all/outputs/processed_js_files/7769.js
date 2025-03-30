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

async function* fibonacciGenerator(n) {
  let [a, b] = [0, 1];
  while (n-- > 0) {
    await delay(500);
    yield a;
    [a, b] = [b, a + b];
  }
}

const ee = new EventEmitter();

ee.on('data', data => print(`Received: ${data}`));
ee.on('complete', () => print('Fibonacci sequence complete.'));

(async () => {
  const fibGen = fibonacciGenerator(10);
  for await (const num of fibGen) {
    ee.emit('data', num);
  }
  ee.emit('complete');
})();
