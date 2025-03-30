(async function advancedFeaturesDemo() {
  const delay = ms => new Promise(res => setTimeout(res, ms));

  class EventEmitter {
    constructor() {
      this.events = {};
    }

    on(event, listener) {
      if (!this.events[event]) this.events[event] = [];
      this.events[event].push(listener);
    }

    emit(event, ...args) {
      if (this.events[event]) {
        this.events[event].forEach(listener => listener(...args));
      }
    }

    removeListener(event, listenerToRemove) {
      if (!this.events[event]) return;
      this.events[event] = this.events[event].filter(listener => listener !== listenerToRemove);
    }
  }

  const emitter = new EventEmitter();

   
  const handler = {
    get(target, prop, receiver) {
      const origMethod = target[prop];
      return function (...args) {
        print(`Calling ${prop} with arguments: ${JSON.stringify(args)}`);
        return origMethod.apply(this, args);
      };
    }
  };

  const proxyEmitter = new Proxy(emitter, handler);

  const exampleAsyncFunction = async () => {
    print('Async function started');
    await delay(2000);
    print('Async function completed');
  };

  const data = {
    name: 'Proxy',
    getName() {
      return `Hello, ${this.name}!`;
    }
  };

  const dataProxy = new Proxy(data, {
    get(target, prop, receiver) {
      if (typeof target[prop] === 'function') {
        return function (...args) {
          print(`Method ${prop} called with args: ${args}`);
          return target[prop].apply(this, args);
        };
      }
      print(`Property ${prop} accessed`);
      return Reflect.get(target, prop, receiver);
    }
  });

  proxyEmitter.on('event', async (message) => {
    print(`Event received: ${message}`);
    await exampleAsyncFunction();
  });

  print(dataProxy.getName());
  print(dataProxy.name);
  proxyEmitter.emit('event', 'This is a test event');
})();
