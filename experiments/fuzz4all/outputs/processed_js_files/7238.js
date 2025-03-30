(async () => {
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

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

  function* fibonacci(limit) {
    let [prev, curr] = [0, 1];
    while (curr <= limit) {
      yield curr;
      [prev, curr] = [curr, prev + curr];
    }
  }

  const events = new EventEmitter();

  events.on('fibonacci', num => {
    print(`Fibonacci: ${num}`);
  });

  events.on('delay', async () => {
    print('Waiting for 1 second...');
    await delay(1000);
    print('Done waiting.');
  });

  const calculateFibonacci = async (limit) => {
    for (const num of fibonacci(limit)) {
      events.emit('fibonacci', num);
      await events.emit('delay');
    }
  };

  print('Starting Fibonacci sequence...');
  await calculateFibonacci(21);
  print('Sequence complete.');
})();
