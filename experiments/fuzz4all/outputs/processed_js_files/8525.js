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
      for (const listener of this.events.get(event)) {
        listener(...args);
      }
    }
  }

  off(event, listener) {
    if (this.events.has(event)) {
      this.events.get(event).delete(listener);
    }
  }
}

const emitter = new EventEmitter();
const asyncTask = (id) => new Promise((resolve) => setTimeout(() => resolve(`Task ${id} completed`), Math.random() * 1000));

async function executeTasksConcurrently(tasks) {
  const results = await Promise.allSettled(tasks.map((task, index) => asyncTask(index)));
  emitter.emit('done', results.map(result => result.status === 'fulfilled' ? result.value : 'Failed'));
}

emitter.on('done', (results) => {
  for (const result of results) {
    print(result);
  }
});

executeTasksConcurrently(new Array(5).fill(null));
