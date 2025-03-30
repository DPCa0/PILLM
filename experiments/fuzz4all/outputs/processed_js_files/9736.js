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

    const newListeners = this.events.get(event).filter(
      listener => listener !== listenerToRemove
    );

    if (newListeners.length === 0) {
      this.events.delete(event);
    } else {
      this.events.set(event, newListeners);
    }
  }
}

 
const emitter = new EventEmitter();

const greetListener = name => print(`Hello, ${name}!`);
emitter.on('greet', greetListener);

const farewellListener = name => print(`Goodbye, ${name}!`);
emitter.on('farewell', farewellListener);

emitter.emit('greet', 'Alice');
emitter.emit('farewell', 'Bob');

 
const person = {
  name: 'John Doe',
  age: 30,
};

const handler = {
  get(target, prop) {
    if (prop === 'age') {
      return `${target[prop]} years old`;
    }
    return target[prop];
  },
  set(target, prop, value) {
    if (prop === 'age' && value < 0) {
      throw new Error("Age can't be negative");
    }
    target[prop] = value;
    return true;
  }
};

const proxyPerson = new Proxy(person, handler);
print(proxyPerson.name);
print(proxyPerson.age);

try {
  proxyPerson.age = -1;
} catch (error) {
  console.error(error.message);
}

emitter.off('greet', greetListener);
emitter.emit('greet', 'Charlie');
