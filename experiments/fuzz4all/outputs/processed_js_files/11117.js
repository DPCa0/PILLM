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
      const listeners = this.events.get(event);
      listeners.delete(listener);
      if (listeners.size === 0) {
        this.events.delete(event);
      }
    }
  }
}

const emitter = new EventEmitter();
const log = (...messages) => print(...messages);
const greet = (name) => print(`Hello, ${name}!`);

emitter.on('message', log);
emitter.on('greeting', greet);

emitter.emit('message', 'This is a', 'multi-part', 'message');
emitter.emit('greeting', 'Alice');

emitter.off('greeting', greet);

emitter.emit('greeting', 'Bob');  

 
const withDefaults = (defaults, obj) => {
  return new Proxy(obj, {
    get(target, prop) {
      return prop in target ? target[prop] : defaults[prop];
    }
  });
};

const user = withDefaults({ name: 'Guest', age: 25 }, { name: 'John' });
print(user.name);  
print(user.age);   

 
function* asyncGenerator() {
  const names = ['Alice', 'Bob', 'Charlie'];
  for (const name of names) {
    yield new Promise((resolve) => setTimeout(() => resolve(name), 1000));
  }
}

(async () => {
  for await (const name of asyncGenerator()) {
    print(`Processed: ${name}`);
  }
})();
