class AsyncEventEmitter {
  constructor() {
    this.events = new Map();
  }

  async emit(event, ...args) {
    if (!this.events.has(event)) return;

    const listeners = this.events.get(event);
    for (const listener of listeners) {
      await listener(...args);
    }
  }

  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(listener);
  }

  off(event, listenerToRemove) {
    if (!this.events.has(event)) return;

    const listeners = this.events.get(event).filter(
      listener => listener !== listenerToRemove
    );

    if (listeners.length > 0) {
      this.events.set(event, listeners);
    } else {
      this.events.delete(event);
    }
  }
}

const simulateAsyncTask = (name, duration) => new Promise(resolve => {
  setTimeout(() => {
    print(`Task ${name} completed`);
    resolve();
  }, duration);
});

(async () => {
  const emitter = new AsyncEventEmitter();

  emitter.on('taskCompleted', async (taskName) => {
    await simulateAsyncTask(taskName, 1000);
  });

  emitter.on('taskCompleted', async (taskName) => {
    await simulateAsyncTask(`${taskName} - additional work`, 500);
  });

  print('Starting tasks...');
  await emitter.emit('taskCompleted', 'Task 1');
  await emitter.emit('taskCompleted', 'Task 2');

  print('All tasks completed!');
})();
