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

function* fibonacci(max) {
  let [prev, curr] = [0, 1];
  while (curr < max) {
    [prev, curr] = [curr, prev + curr];
    yield curr;
  }
}

(async () => {
  const emitter = new EventEmitter();
  
  emitter.on('data', (num) => {
    print(`Fibonacci number: ${num}`);
  });

  emitter.on('end', () => {
    print('Sequence complete.');
  });

  const max = 100;
  for await (const num of fibonacci(max)) {
    emitter.emit('data', num);
  }
  
  emitter.emit('end');
})();
