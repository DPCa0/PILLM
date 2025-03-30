class EventEmitter {
  constructor() {
    this.events = new Map();
  }
  on(event, listener) {
    if (!this.events.has(event)) this.events.set(event, []);
    this.events.get(event).push(listener);
  }
  emit(event, ...args) {
    const listeners = this.events.get(event);
    if (listeners) listeners.forEach(listener => listener(...args));
  }
}

class Task {
  constructor(fn) {
    this.fn = fn;
  }
  run() {
    return this.fn();
  }
}

const asyncMiddleware = (fn) => async (...args) => {
  print('Async operation started');
  const result = await fn(...args);
  print('Async operation finished');
  return result;
};

const eventEmitter = new EventEmitter();

const taskRunner = (tasks) => {
  for (let task of tasks) {
    eventEmitter.emit('taskStart', task);
    task.run();
    eventEmitter.emit('taskEnd', task);
  }
};

const task1 = new Task(asyncMiddleware(async () => {
  print('Task 1 is running');
  return new Promise(resolve => setTimeout(resolve, 1000));
}));

const task2 = new Task(asyncMiddleware(async () => {
  print('Task 2 is running');
  return new Promise(resolve => setTimeout(resolve, 2000));
}));

eventEmitter.on('taskStart', (task) => print(`Starting ${task.fn.name}`));
eventEmitter.on('taskEnd', (task) => print(`Ending ${task.fn.name}`));

taskRunner([task1, task2]);
