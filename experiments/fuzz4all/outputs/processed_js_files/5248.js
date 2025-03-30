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

const createProxy = (obj) => {
  return new Proxy(obj, {
    get(target, property) {
      print(`Getting property: ${property}`);
      return Reflect.get(target, property);
    },
    set(target, property, value) {
      print(`Setting property: ${property} to ${value}`);
      return Reflect.set(target, property, value);
    }
  });
};

const asyncTask = async (id, delay) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Task ${id} completed!`), delay);
  });
};

const eventEmitter = new EventEmitter();
const state = createProxy({ name: "JS Enthusiast", completedTasks: 0 });

eventEmitter.on('taskComplete', (msg) => {
  print(msg);
  state.completedTasks++;
});

const main = async () => {
  const tasks = [asyncTask(1, 2000), asyncTask(2, 1000), asyncTask(3, 3000)];
  for await (const task of tasks) {
    const result = await task;
    eventEmitter.emit('taskComplete', result);
  }
  print(`All tasks completed by ${state.name}. Total: ${state.completedTasks}`);
};

main();
