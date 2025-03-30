 
class EventEmitter {
  constructor() {
    this.events = new Map();
  }

   
  *getListeners(event) {
    const listeners = this.events.get(event) || [];
    for (const listener of listeners) {
      yield listener;
    }
  }

  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(listener);
  }

  emit(event, ...args) {
    for (const listener of this.getListeners(event)) {
       
      Promise.resolve().then(() => listener(...args));
    }
  }
}

 
const handler = {
  get(target, prop, receiver) {
    if (typeof target[prop] === 'function') {
      return (...args) => {
        print(`Calling method: ${prop}`);
        return target[prop].apply(receiver, args);
      };
    }
    return Reflect.get(target, prop, receiver);
  }
};

 
const proxyEmitter = new Proxy(new EventEmitter(), handler);

 
proxyEmitter.on('greet', async name => {
  const greeting = await Promise.resolve(`Hello, ${name}!`);
  print(greeting);
});

 
proxyEmitter.emit('greet', 'world');
