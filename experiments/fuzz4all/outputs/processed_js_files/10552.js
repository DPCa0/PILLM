class AsyncEventEmitter {
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

  async emitAsync(event, ...args) {
    if (!this.events.has(event)) return;
    for (const listener of this.events.get(event)) {
      await listener(...args);
    }
  }
}

const asyncEmitter = new AsyncEventEmitter();

asyncEmitter.on('data', async (value) => {
  print('Listener 1 received:', value);
  await new Promise(resolve => setTimeout(resolve, 1000));
  print('Listener 1 processed:', value);
});

asyncEmitter.on('data', async (value) => {
  print('Listener 2 received:', value);
  await new Promise(resolve => setTimeout(resolve, 500));
  print('Listener 2 processed:', value);
});

(async () => {
  print('Emitting event...');
  await asyncEmitter.emitAsync('data', { key: 'value' });
  print('All listeners processed.');
})();

const symbolTag = Symbol('tag');
const taggedObject = {
  [symbolTag]: 'unique-identifier',
  data: 'important data',
};

print('Accessing taggedObject\'s symbol property:', taggedObject[symbolTag]);
