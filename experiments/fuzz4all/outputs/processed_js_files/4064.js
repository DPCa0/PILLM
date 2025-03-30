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

class TaskQueue {
  constructor(concurrency) {
    this.concurrency = concurrency;
    this.queue = [];
    this.activeCount = 0;
  }

  _next() {
    if (this.queue.length === 0 || this.activeCount >= this.concurrency) return;
    this.activeCount++;
    const [task, resolve] = this.queue.shift();
    task().then(resolve).finally(() => {
      this.activeCount--;
      this._next();
    });
  }

  add(task) {
    return new Promise(resolve => {
      this.queue.push([task, resolve]);
      this._next();
    });
  }
}

(async () => {
  const emitter = new EventEmitter();
  const queue = new TaskQueue(2);

  const complexCalculation = async (value) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(value * 2);
      }, Math.random() * 2000);
    });
  };

  emitter.on('taskComplete', (result) => {
    print(`Task complete with result: ${result}`);
  });

  const tasks = Array.from({ length: 5 }, (_, i) => async () => {
    const result = await complexCalculation(i + 1);
    emitter.emit('taskComplete', result);
  });

  await Promise.all(tasks.map(task => queue.add(task)));
  print('All tasks completed');
})();
