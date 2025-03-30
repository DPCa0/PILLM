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

 
const emitter = new EventEmitter();
emitter.on('data', (data) => {
  print(`Received: ${data}`);
});

function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Some data');
    }, 1000);
  });
}

async function processData() {
  const data = await fetchData();
  emitter.emit('data', data);
}

const proxyHandler = {
  get: (target, prop) => {
    if (prop === 'run') {
      print('Executing process...');
    }
    return target[prop];
  }
};

const proxyProcess = new Proxy({ run: processData }, proxyHandler);
proxyProcess.run();
