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

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const asyncAdd = async (a, b) => {
  await delay(500);  
  return a + b;
};

(async () => {
  const emitter = new EventEmitter();

  emitter.on('result', result => {
    print(`Result received: ${result}`);
  });

  try {
    const result = await asyncAdd(5, 7);
    emitter.emit('result', result);
  } catch (error) {
    console.error('Error:', error);
  }

  const myProxy = new Proxy({ prop: 42 }, {
    get: (target, prop) => {
      print(`Accessed property "${prop}" with value ${target[prop]}`);
      return target[prop];
    }
  });

  print(myProxy.prop);

  const add = (a, b) => a + b;

  const curriedAdd = a => b => add(a, b);

  print(curriedAdd(10)(20));
})();
