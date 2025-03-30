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

const asyncOperation = (data, delay) => 
  new Promise(resolve => setTimeout(() => resolve(`Processed: ${data}`), delay));

(async () => {
  const emitter = new EventEmitter();

  const processListener = async (data) => {
    const result = await asyncOperation(data, 1000);
    print(result);
  };

  emitter.on('process', processListener);

  const tasks = ['task1', 'task2', 'task3'];
  await Promise.all(tasks.map(task => {
    emitter.emit('process', task);
    return asyncOperation(task, 1000);
  }));

  emitter.off('process', processListener);
})();
