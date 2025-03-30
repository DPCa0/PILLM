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

const asyncTask = async () => {
  return new Promise((resolve) => setTimeout(() => resolve('Task Complete'), 1000));
}

const taskManager = new EventEmitter();

(async () => {
  taskManager.on('start', async () => {
    print('Task Started');
    const result = await asyncTask();
    taskManager.emit('end', result);
  });

  taskManager.on('end', (result) => {
    print(result);
  });

   
  const managerProxy = new Proxy(taskManager, {
    get(target, property) {
      if (typeof target[property] === 'function') {
        return (...args) => {
          print(`Calling ${property} with`, args);
          return target[property](...args);
        }
      }
      return target[property];
    }
  });

  managerProxy.emit('start');
})();
