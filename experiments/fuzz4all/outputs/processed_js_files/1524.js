 
class EventEmitter {
  constructor() {
    this.events = {};
    return new Proxy(this, {
      get(target, prop) {
        if (!(prop in target)) {
          target.events[prop] = target.events[prop] || [];
          return target.emit.bind(target, prop);
        }
        return target[prop];
      },
    });
  }

  emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach(listener => listener(...args));
    }
  }

  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }
}

 
const emitter = new EventEmitter();

emitter.on('data', async (msg) => {
  const processedMsg = await new Promise(resolve => setTimeout(() => resolve(`Processed: ${msg}`), 1000));
  print(processedMsg);
});

emitter.on('data', (msg) => {
  print(`Received: ${msg}`);
});

(async function() {
  const uniqueEvent = Symbol('unique');
  
  emitter.on(uniqueEvent, () => {
    print('This event uses a unique symbol');
  });

  emitter.data('Hello, world!');
  await emitter.data('Another message');
  emitter[uniqueEvent]();
})();
