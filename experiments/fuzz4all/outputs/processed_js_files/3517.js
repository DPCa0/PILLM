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

const asyncProcess = async (emitter) => {
  print("Process started");
  emitter.emit('start');

  await delay(1000);
  print("Step 1 complete");
  emitter.emit('step', 1);

  await delay(1000);
  print("Step 2 complete");
  emitter.emit('step', 2);

  await delay(1000);
  print("Process completed");
  emitter.emit('end');
};

const emitter = new EventEmitter();

emitter.on('start', () => print('Event: Process Started'));
emitter.on('step', step => print(`Event: Step ${step} Completed`));
emitter.on('end', () => print('Event: Process Ended'));

asyncProcess(emitter);
