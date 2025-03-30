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

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function complexOperation(emitter) {
  print('Starting complex operation...');
  await sleep(1000);
  print('Step 1 complete');
  emitter.emit('step', 1);
  await sleep(1000);
  print('Step 2 complete');
  emitter.emit('step', 2);
  await sleep(1000);
  print('Operation complete');
  emitter.emit('complete');
}

const emitter = new EventEmitter();
emitter.on('step', step => print(`Event received: Step ${step}`));
emitter.on('complete', () => print('Event received: Operation complete'));

complexOperation(emitter);
