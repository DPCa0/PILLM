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
      for (const listener of this.events.get(event)) {
        listener(...args);
      }
    }
  }

  off(event, listener) {
    if (this.events.has(event)) {
      this.events.set(
        event,
        this.events.get(event).filter(l => l !== listener)
      );
    }
  }
}

const emitter = new EventEmitter();

const asyncTask = (ms, value) => new Promise((resolve) => {
  setTimeout(() => resolve(value), ms);
});

(async () => {
  emitter.on('taskCompleted', result => {
    print(`Task completed with result: ${result}`);
  });

  const values = [100, 200, 300, 400];

  const tasks = values.map((value, index) =>
    asyncTask(Math.random() * 1000, value).then(result => {
      emitter.emit('taskCompleted', result + index);
    })
  );

  await Promise.all(tasks);

  print('All tasks completed!');
})();
