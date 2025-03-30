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

const emitter = new EventEmitter();

emitter.on('data', async (data) => {
  const processed = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data.map(num => num * 2));
    }, 1000);
  });
  print('Processed Data:', processed);
});

emitter.on('data', (data) => {
  try {
    const max = Math.max(...data);
    print('Max Value:', max);
  } catch (err) {
    console.error('Error:', err);
  }
});

(async function() {
  const data = [1, 2, 3, 4, 5];
  print('Original Data:', data);
  emitter.emit('data', data);
})();
