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

  off(event, listenerToRemove) {
    if (!this.events.has(event)) return;
    const filteredListeners = this.events.get(event).filter(listener => listener !== listenerToRemove);
    this.events.set(event, filteredListeners);
  }
}

 
const loggerHandler = {
  get(target, property) {
    print(`Accessed property: ${property}`);
    return Reflect.get(target, property);
  },
  apply(target, thisArg, argumentsList) {
    print(`Called function with args: ${argumentsList}`);
    return Reflect.apply(target, thisArg, argumentsList);
  }
};

 
const emitter = new Proxy(new EventEmitter(), loggerHandler);

emitter.on('greet', name => print(`Hello, ${name}!`));
emitter.emit('greet', 'Alice');

 
async function* asyncNumbers() {
  let i = 0;
  while (i < 5) {
    yield new Promise(resolve => setTimeout(() => resolve(i++), 500));
  }
}

(async () => {
  for await (let num of asyncNumbers()) {
    print(num);
  }
})();

 
const state = new WeakMap();
class StateManager {
  constructor() {
    state.set(this, new Set());
  }

  add(item) {
    const items = state.get(this);
    if (!items.has(item)) {
      items.add(item);
      print(`Added: ${item}`);
    }
  }

  show() {
    print('Current state:', Array.from(state.get(this)));
  }
}

const manager = new StateManager();
manager.add(1);
manager.add(2);
manager.add(1);  
manager.show();
