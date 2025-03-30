class EventEmitter {
  constructor() {
    this.events = {};
  }
  on(event, listener) {
    (this.events[event] || (this.events[event] = [])).push(listener);
  }
  emit(event, ...args) {
    (this.events[event] || []).forEach(fn => fn(...args));
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function* asyncNumberGenerator(max) {
  for (let i = 1; i <= max; i++) {
    await delay(500);  
    yield i;
  }
}

const processNumbers = async () => {
  const emitter = new EventEmitter();

  emitter.on('data', data => {
    print(`Received number: ${data}`);
  });

  emitter.on('done', () => {
    print('Processing complete.');
  });

  for await (const number of asyncNumberGenerator(5)) {
    emitter.emit('data', number);
  }

  emitter.emit('done');
};

processNumbers();
