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

class TaskRunner extends EventEmitter {
  constructor(tasks = []) {
    super();
    this.tasks = tasks;
    this.results = [];
  }

  async run() {
    for (const task of this.tasks) {
      this.emit('beforeTask', task);
      const result = await task();
      this.results.push(result);
      this.emit('afterTask', task, result);
    }
    this.emit('complete', this.results);
  }
}

 
const taskRunnerHandler = {
  get(target, prop, receiver) {
    if (typeof target[prop] === 'function') {
      return (...args) => {
        print(`Calling ${prop} with`, args);
        return target[prop](...args);
      };
    }
    return Reflect.get(target, prop, receiver);
  }
};

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const tasks = [
  () => delay(1000).then(() => 'Task 1 completed'),
  () => delay(500).then(() => 'Task 2 completed'),
  () => delay(1500).then(() => 'Task 3 completed')
];

 
const taskRunner = new TaskRunner(tasks);
const proxyTaskRunner = new Proxy(taskRunner, taskRunnerHandler);

 
proxyTaskRunner.on('beforeTask', task => print('Starting:', task));
proxyTaskRunner.on('afterTask', (task, result) => print('Finished:', result));
proxyTaskRunner.on('complete', results => print('All tasks completed:', results));

 
proxyTaskRunner.run();
