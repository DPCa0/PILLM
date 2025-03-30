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

const asyncOperation = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("Operation Successful"), 1000);
  });
};

(async () => {
  const eventEmitter = new EventEmitter();

  const complexOperation = async () => {
    try {
      let result = await asyncOperation();
      eventEmitter.emit('success', result);
    } catch (error) {
      eventEmitter.emit('error', error);
    }
  };

  eventEmitter.on('success', message => {
    print(`Success: ${message}`);
  });

  eventEmitter.on('error', error => {
    console.error(`Error: ${error}`);
  });

  await complexOperation();

  const proxyHandler = {
    get(target, prop) {
      print(`Accessing property ${prop}`);
      return Reflect.get(target, prop);
    },
    set(target, prop, value) {
      print(`Setting property ${prop} to ${value}`);
      return Reflect.set(target, prop, value);
    }
  };

  let data = {
    a: 1,
    b: 2,
    c: 3
  };

  const proxiedData = new Proxy(data, proxyHandler);

  proxiedData.a;
  proxiedData.b = 42;
})();
