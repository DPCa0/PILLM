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

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

(async function() {
  const emitter = new EventEmitter();

  emitter.on('data', async (data) => {
    print(`Processing: ${data}`);
    await delay(1000);
    print(`Processed: ${data}`);
  });

  emitter.on('error', (err) => {
    console.error(`Error: ${err.message}`);
  });

  try {
    ['task1', 'task2', 'task3'].forEach(task => {
      if (task === 'task2') throw new Error('Processing failed!');
      emitter.emit('data', task);
    });
  } catch (err) {
    emitter.emit('error', err);
  }
})();
