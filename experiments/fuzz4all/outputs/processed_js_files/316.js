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

  removeListener(event, listenerToRemove) {
    if (!this.events.has(event)) return;
    const filteredListeners = this.events.get(event)
      .filter(listener => listener !== listenerToRemove);
    this.events.set(event, filteredListeners);
  }
}

const asyncOperation = () => new Promise(resolve => setTimeout(() => resolve('Operation Complete!'), 1000));

(async () => {
  const eventEmitter = new EventEmitter();

  eventEmitter.on('start', () => print('Starting async operation...'));
  eventEmitter.on('complete', message => print(`Completed: ${message}`));

  eventEmitter.emit('start');
  const result = await asyncOperation();
  eventEmitter.emit('complete', result);

   
  const target = { message: 'Hello, Proxy!' };
  const handler = {
    get: (obj, prop) => {
      print(`Getting property ${prop}`);
      return prop in obj ? obj[prop] : `Property ${prop} not found.`;
    },
    set: (obj, prop, value) => {
      print(`Setting property ${prop} to ${value}`);
      obj[prop] = value;
      return true;
    }
  };

  const proxy = new Proxy(target, handler);

  print(proxy.message);
  proxy.message = 'Hello, Updated Proxy!';
  print(proxy.message);
  print(proxy.nonexistent);

   
  function* generatorExample() {
    yield 'Hello';
    yield 'from';
    yield 'Generators';
  }

  const generator = generatorExample();
  for (const value of generator) {
    print(value);
  }
})();
