class EventEmitter {
  constructor() {
    this.events = {};
  }
  on(event, listener) {
    (this.events[event] || (this.events[event] = [])).push(listener);
  }
  emit(event, ...args) {
    (this.events[event] || []).slice().forEach(lsn => lsn(...args));
  }
}

const asyncTimeout = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  const emitter = new EventEmitter();

  const delayedMessage = async (msg, delay) => {
    await asyncTimeout(delay);
    print(msg);
  };

  const complexListener = async () => {
    print('Start Complex Process');
    await delayedMessage('Processing...', 1000);
    await delayedMessage('Still Processing...', 2000);
    print('Complex Process Done!');
    emitter.emit('processComplete', new Date().toISOString());
  };

  emitter.on('startProcess', complexListener);
  emitter.on('processComplete', (timestamp) => print(`Process completed at: ${timestamp}`));

  print('Initializing...');
  emitter.emit('startProcess');
})();
