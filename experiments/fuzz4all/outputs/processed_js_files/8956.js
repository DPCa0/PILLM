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

const asyncOperation = () => new Promise((resolve) => setTimeout(() => resolve("Data received"), 1000));

async function complexProcess() {
  const eventEmitter = new EventEmitter();

  eventEmitter.on('start', () => print('Process started.'));
  eventEmitter.on('data', (data) => print(`Processing: ${data}`));
  eventEmitter.on('error', (err) => console.error(`Error: ${err}`));
  eventEmitter.on('end', () => print('Process ended.'));

  try {
    eventEmitter.emit('start');

    const data = await asyncOperation();
    eventEmitter.emit('data', data);

     
    const transformedData = [...data].reverse().join('');
    print(`Transformed Data: ${transformedData}`);

    eventEmitter.emit('end');
  } catch (error) {
    eventEmitter.emit('error', error);
  }
}

complexProcess();
