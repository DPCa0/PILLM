 

 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
async function* asyncGenerator() {
  for (let i = 0; i < 5; i++) {
    await delay(1000);  
    yield i;
  }
}

 
const handler = {
  get: (target, prop, receiver) => {
    if (typeof target[prop] === 'function') {
      return function(...args) {
        print(`Method called: ${prop} with arguments: ${JSON.stringify(args)}`);
        return target[prop].apply(this, args);
      };
    }
    return Reflect.get(target, prop, receiver);
  }
};

 
class EventHandler {
  constructor() {
    this.handlers = {};
  }

  on(event, handler) {
    if (!this.handlers[event]) {
      this.handlers[event] = [];
    }
    this.handlers[event].push(handler);
  }

  emit(event, data) {
    if (this.handlers[event]) {
      this.handlers[event].forEach(handler => handler(data));
    }
  }
}

 
const proxiedEventHandler = new Proxy(new EventHandler(), handler);

 
(async () => {
  proxiedEventHandler.on('data', (data) => {
    print(`Received data: ${data}`);
  });

  for await (let value of asyncGenerator()) {
    proxiedEventHandler.emit('data', value);
  }
})();
