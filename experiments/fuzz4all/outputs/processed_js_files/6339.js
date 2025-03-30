class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }
    this.events.get(event).add(listener);
  }

  emit(event, ...args) {
    if (this.events.has(event)) {
      this.events.get(event).forEach(listener => listener(...args));
    }
  }

  removeListener(event, listenerToRemove) {
    if (this.events.has(event)) {
      this.events.set(
        event,
        new Set([...this.events.get(event)].filter(listener => listener !== listenerToRemove))
      );
    }
  }
}

const asyncOperation = () => new Promise(resolve => setTimeout(() => resolve('Operation Completed'), 1000));

const emitter = new EventEmitter();

async function execute() {
  const result = await asyncOperation();
  emitter.emit('completed', result);
}

emitter.on('completed', msg => print(msg));
emitter.on('completed', msg => print('This event can trigger multiple listeners'));

execute().then(() => {
  emitter.removeListener('completed', msg => print(msg));  
  execute();  
});
