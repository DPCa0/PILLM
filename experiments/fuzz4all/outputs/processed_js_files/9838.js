class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (!this.events.has(event)) this.events.set(event, []);
    this.events.get(event).push(listener);
  }

  emit(event, ...args) {
    if (!this.events.has(event)) return;
    this.events.get(event).forEach(listener => listener(...args));
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

(async function complexApp() {
  const eventEmitter = new EventEmitter();

  const asyncGenerator = async function*() {
    for (let i = 0; i < 5; i++) {
      await delay(1000);
      yield `tick ${i}`;
    }
  };

  eventEmitter.on('tick', async message => {
    print(`[EVENT] ${message}`);
  });

  const generator = asyncGenerator();
  for await (const message of generator) {
    eventEmitter.emit('tick', message);
  }

  print('Done!');
})();
