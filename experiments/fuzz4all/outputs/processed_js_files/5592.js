class EventEmitter {
  constructor() {
    this.events = new Map();
  }
  on(event, listener) {
    if (!this.events.has(event)) this.events.set(event, []);
    this.events.get(event).push(listener);
  }
  emit(event, ...args) {
    if (this.events.has(event)) {
      this.events.get(event).forEach(listener => listener(...args));
    }
  }
}

const asyncOperation = (result, time) => new Promise(resolve => setTimeout(() => resolve(result), time));

const processResults = async () => {
  const results = await Promise.allSettled([
    asyncOperation('Task 1 Complete', 1000),
    asyncOperation('Task 2 Complete', 2000),
    asyncOperation('Task 3 Complete', 1500)
  ]);
  
  const successfulResults = results
    .filter(result => result.status === 'fulfilled')
    .map(result => result.value);
  
  print(`Successful Results: ${successfulResults.join(', ')}`);
};

const emitter = new EventEmitter();
emitter.on('complete', result => print(`Listener received: ${result}`));

(async () => {
  emitter.emit('complete', 'Starting Tasks');
  await processResults();
  emitter.emit('complete', 'All Tasks Complete');
})();
