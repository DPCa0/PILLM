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
    const listeners = this.events.get(event);
    if (listeners) {
      listeners.forEach(listener => listener(...args));
    }
  }
  
  off(event, listenerToRemove) {
    if (!this.events.has(event)) return;
    const newListeners = this.events.get(event).filter(listener => listener !== listenerToRemove);
    this.events.set(event, newListeners);
  }
}

function asyncOperation(duration, name) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`${name} done`);
    }, duration);
  });
}

async function* asyncGenerator(operations) {
  for (const operation of operations) {
    yield await asyncOperation(operation.duration, operation.name);
  }
}

const operations = [
  { duration: 1000, name: 'Task 1' },
  { duration: 2000, name: 'Task 2' },
  { duration: 1500, name: 'Task 3' },
];

async function executeTasks() {
  const emitter = new EventEmitter();
  emitter.on('taskCompleted', msg => print(msg));

  const generator = asyncGenerator(operations);

  for await (const message of generator) {
    emitter.emit('taskCompleted', message);
  }
}

executeTasks();
