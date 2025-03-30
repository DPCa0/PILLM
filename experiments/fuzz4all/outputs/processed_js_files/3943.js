class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (typeof this.events[event] !== 'object') {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  emit(event, ...args) {
    if (typeof this.events[event] === 'object') {
      this.events[event].forEach(listener => listener.apply(this, args));
    }
  }

  removeListener(event, listener) {
    if (typeof this.events[event] === 'object') {
      const idx = this.events[event].indexOf(listener);
      if (idx > -1) {
        this.events[event].splice(idx, 1);
      }
    }
  }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async function main() {
  const emitter = new EventEmitter();

  const delayedLog = async (msg) => {
    await delay(1000);
    print(msg);
  };

  emitter.on('message', async (msg) => {
    await delayedLog(`Received: ${msg}`);
  });

  const messages = ['Hello', 'world', 'from', 'async', 'events'];

  for (const message of messages) {
    emitter.emit('message', message);
  }

  emitter.on('complete', () => {
    print('All messages processed');
  });

  await delay(messages.length * 1000 + 500);
  emitter.emit('complete');
})();
