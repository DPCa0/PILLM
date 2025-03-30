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

  once(event, listener) {
    const onceWrapper = (...args) => {
      listener(...args);
      this.off(event, onceWrapper);
    };
    this.on(event, onceWrapper);
  }

  off(event, listener) {
    if (this.events.has(event)) {
      const listeners = this.events.get(event);
      this.events.set(event, listeners.filter(l => l !== listener));
    }
  }
}

class FibonacciAsyncIterator {
  constructor(limit) {
    this.limit = limit;
    this.count = 0;
    this.prev = 0;
    this.curr = 1;
  }

  [Symbol.asyncIterator]() {
    return {
      next: () => {
        if (this.count >= this.limit) return Promise.resolve({ done: true });
        [this.prev, this.curr] = [this.curr, this.prev + this.curr];
        this.count++;
        return Promise.resolve({ value: this.prev, done: false });
      }
    };
  }
}

(async function() {
  const fib = new FibonacciAsyncIterator(10);
  const eventEmitter = new EventEmitter();

  eventEmitter.on('data', data => print(`Data received: ${data}`));
  eventEmitter.once('end', () => print('Fibonacci sequence ended.'));

  for await (let num of fib) {
    eventEmitter.emit('data', num);
  }
  eventEmitter.emit('end');
})();
