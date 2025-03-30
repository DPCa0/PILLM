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

function* idGenerator() {
  let id = 0;
  while (true) {
    yield id++;
  }
}

const asyncOperation = (delay) => new Promise(resolve => setTimeout(resolve, delay));

(async () => {
  const emitter = new EventEmitter();
  const idGen = idGenerator();

  const performTask = async (taskId) => {
    print(`Starting task ${taskId}`);
    await asyncOperation(Math.random() * 2000 + 1000);
    print(`Finished task ${taskId}`);
    emitter.emit('taskCompleted', taskId);
  };

  emitter.on('taskCompleted', (taskId) => {
    print(`Task ${taskId} completed!`);
  });

  const tasks = Array.from({ length: 5 }, () => performTask(idGen.next().value));
  await Promise.all(tasks);
})();
