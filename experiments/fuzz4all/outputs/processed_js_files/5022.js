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
      const filteredListeners = this.events.get(event).filter(listener => listener !== listenerToRemove);
      this.events.set(event, filteredListeners);
    }
  }
}

 
const eventLogger = new Proxy(new EventEmitter(), {
  get(target, prop) {
    if (typeof target[prop] === 'function') {
      return function (...args) {
        print(`Calling method: ${prop}, with arguments: ${JSON.stringify(args)}`);
        return target[prop].apply(target, args);
      };
    }
    return target[prop];
  }
});

 
const UNIQUE_EVENT = Symbol('uniqueEvent');

 
eventLogger.on(UNIQUE_EVENT, ({ message, level }) => {
  print(`Event received - Level: ${level}, Message: "${message}"`);
});

 
async function triggerEventAsync() {
  await new Promise(resolve => setTimeout(resolve, 1000));
  eventLogger.emit(UNIQUE_EVENT, { message: 'Hello from the async world!', level: 'info' });
}

triggerEventAsync();
