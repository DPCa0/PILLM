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

const delay = ms => new Promise(res => setTimeout(res, ms));

async function* asyncGenerator(array) {
  for (const item of array) {
    await delay(1000);  
    yield item;
  }
}

const proxyHandler = {
  get: (target, property) => {
    if (property in target) {
      print(`Getting property: ${property}`);
      return target[property];
    }
    return 'Property does not exist';
  }
};

const myObject = { foo: 'bar', baz: 42 };
const proxy = new Proxy(myObject, proxyHandler);

(async () => {
  const emitter = new EventEmitter();
  
  emitter.on('data', data => {
    print(`Received data: ${data}`);
  });
  
  emitter.on('end', () => {
    print('End of data stream');
  });

  const gen = asyncGenerator([1, 2, 3, 4, 5]);
  
  for await (const value of gen) {
    emitter.emit('data', value);
  }

  emitter.emit('end');
  
  print(proxy.foo);
  print(proxy.bar);
})();
