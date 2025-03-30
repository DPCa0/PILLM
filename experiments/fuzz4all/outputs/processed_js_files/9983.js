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

 
const handler = {
  get(target, property) {
    print(`Accessing property "${property}"`);
    return target[property];
  },
  set(target, property, value) {
    print(`Setting property "${property}" to "${value}"`);
    target[property] = value;
    return true;
  }
};

const logger = new Proxy(new EventEmitter(), handler);

logger.on('greet', name => print(`Hello, ${name}!`));
logger.emit('greet', 'world');

logger.on('farewell', name => print(`Goodbye, ${name}!`));
logger.emit('farewell', 'world');

 
async function* asyncGenerator() {
  const values = [1, 2, 3];
  for (const value of values) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    yield value * 2;
  }
}

(async () => {
  for await (const num of asyncGenerator()) {
    print(num);
  }
})();

 
const PRIVATE_DATA = Symbol('privateData');
const internalData = new WeakMap();

class AdvancedClass {
  constructor(data) {
    this[PRIVATE_DATA] = data;
    internalData.set(this, { data });
  }

  getData() {
    return this[PRIVATE_DATA];
  }

  getInternalData() {
    return internalData.get(this).data;
  }
}

const instance = new AdvancedClass("Secret");
print(instance.getData());
print(instance.getInternalData());
