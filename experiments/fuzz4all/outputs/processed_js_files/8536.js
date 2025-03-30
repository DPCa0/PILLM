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
    if (this.events.has(event)) {
      this.events.get(event).forEach(listener => listener(...args));
    }
  }

  off(event, listener) {
    if (this.events.has(event)) {
      this.events.get(event).delete(listener);
    }
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function* asyncGenerator(arr) {
  for (const item of arr) {
    await delay(1000);
    yield item;
  }
}

(async () => {
  const events = new EventEmitter();
  events.on('data', data => print(`Received: ${data}`));

  const numbers = asyncGenerator([10, 20, 30, 40]);

  for await (const number of numbers) {
    events.emit('data', number);
  }

  const asyncSum = async (...args) => {
    return args.reduce((acc, val) => acc + val, 0);
  };

  print(`Sum: ${await asyncSum(5, 15, 25, 35)}`);
})();
