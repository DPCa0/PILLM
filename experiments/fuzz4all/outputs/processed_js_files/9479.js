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

 
async function asyncTaskRunner(tasks) {
  for (let task of tasks) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    print(`Task ${task} completed`);
  }
}

const tasks = ['task1', 'task2', 'task3'];

 
function* taskGenerator() {
  for (let i = 0; i < tasks.length; i++) {
    yield tasks[i];
  }
}

 
const handler = {
  get: (obj, prop) => {
    print(`Accessed property: ${prop}`);
    return obj[prop];
  }
};

const proxiedTasks = new Proxy(taskGenerator(), handler);

 
const emitter = new EventEmitter();

emitter.on('start', () => print('Starting tasks...'));
emitter.on('complete', () => print('All tasks completed!'));

emitter.emit('start');
(async () => {
  await asyncTaskRunner(proxiedTasks);
  emitter.emit('complete');
})();
