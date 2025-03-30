class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }
    this.events.get(event).add(listener);
  }

  emit(event, ...args) {
    if (!this.events.has(event)) return false;
    for (let listener of this.events.get(event)) {
      listener.apply(null, args);
    }
    return true;
  }

  off(event, listener) {
    if (!this.events.has(event)) return;
    this.events.get(event).delete(listener);
  }
}

const pipeline = async function* (iterable, ...fns) {
  for await (let item of iterable) {
    let result = item;
    for (let fn of fns) {
      result = await fn(result);
    }
    yield result;
  }
};

(async () => {
  const emitter = new EventEmitter();
  
  emitter.on('data', (data) => print(`Received: ${data}`));
  
  const input = [1, 2, 3, 4, 5];
  const double = async (x) => x * 2;
  const square = async (x) => x ** 2;
  
  for await (let processed of pipeline(input, double, square)) {
    emitter.emit('data', processed);
  }
})();
