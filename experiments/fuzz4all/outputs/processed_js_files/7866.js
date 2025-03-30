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

const asyncOperation = () =>
  new Promise(resolve => setTimeout(() => resolve('Operation complete'), 1000));

async function complexFunction() {
  const eventEmitter = new EventEmitter();
  
  eventEmitter.on('start', message => print(message));
  eventEmitter.on('progress', percent => print(`Progress: ${percent}%`));
  eventEmitter.on('complete', result => print(result));

  eventEmitter.emit('start', 'Starting async operation...');

  for (let i = 1; i <= 100; i += 25) {
    eventEmitter.emit('progress', i);
    await new Promise(resolve => setTimeout(resolve, 250));
  }

  const result = await asyncOperation();
  eventEmitter.emit('complete', result);
}

complexFunction();
