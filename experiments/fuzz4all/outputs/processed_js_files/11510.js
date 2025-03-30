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
    if (this.events.has(event)) {
      this.events.set(event, this.events.get(event).filter(listener => listener !== listenerToRemove));
    }
  }
}

const emitter = new EventEmitter();

 
const target = {
  name: 'Alice',
  age: 25
};

const handler = {
  get: (obj, prop) => {
    print(`Getting ${prop}`);
    return obj[prop];
  },
  set: (obj, prop, value) => {
    print(`Setting ${prop} to ${value}`);
    emitter.emit('propertyChange', { prop, value });
    obj[prop] = value;
    return true;
  }
};

const proxy = new Proxy(target, handler);

emitter.on('propertyChange', ({ prop, value }) => {
  print(`Property changed: ${prop} = ${value}`);
});

proxy.name = 'Bob';
print(proxy.age);
proxy.age = 30;
