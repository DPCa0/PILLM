 

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

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const dataHandler = {
  get(target, prop) {
    print(`Getting property ${prop}`);
    return prop in target ? target[prop] : "Property not found";
  },
  set(target, prop, value) {
    print(`Setting property ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
};

const data = new Proxy({}, dataHandler);

const asyncFunction = async () => {
  data.name = "JavaScript";
  data.version = "ES2021";

  await sleep(1000);
  print(`Hello, ${data.name}! This is ${data.version}`);

  const emitter = new EventEmitter();
  emitter.on('greet', message => print(message));

  await sleep(1000);
  emitter.emit('greet', 'Greetings from EventEmitter!');
};

asyncFunction();
