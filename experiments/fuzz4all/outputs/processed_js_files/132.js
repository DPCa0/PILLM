const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

class EventEmitter {
  constructor() {
    this.events = {};
  }
  on(event, listener) {
    (this.events[event] || (this.events[event] = [])).push(listener);
    return this;
  }
  emit(event, ...args) {
    (this.events[event] || []).forEach(listener => listener(...args));
  }
}

(async function complexFeaturesDemo() {
  const emitter = new EventEmitter();
  
   
  const target = { greeting: 'Hello', name: 'world' };
  const handler = {
    get: (obj, prop) => {
      print(`Property ${prop} accessed`);
      return obj[prop];
    },
    set: (obj, prop, value) => {
      print(`Property ${prop} set to ${value}`);
      obj[prop] = value;
      emitter.emit('propertyChanged', prop, value);
      return true;
    }
  };
  const proxy = new Proxy(target, handler);
  
  emitter.on('propertyChanged', (prop, value) => {
    print(`Event: Property ${prop} changed to ${value}`);
  });

  print(`${proxy.greeting}, ${proxy.name}!`);
  
  await delay(1000);
  
  proxy.name = 'JavaScript';
  
  print(`${proxy.greeting}, ${proxy.name}!`);
})();
